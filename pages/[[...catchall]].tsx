import * as React from "react";
import {
  PlasmicComponent,
  extractPlasmicQueryData,
  ComponentRenderData,
  PlasmicRootProvider,
} from "@plasmicapp/loader-nextjs";
import type { GetStaticPaths, GetStaticProps } from "next";

import Error from "next/error";
import { useRouter } from "next/router";
import { PLASMIC } from "@/plasmic-init";

export default function PlasmicLoaderPage(props: {
  plasmicData?: ComponentRenderData;
  queryCache?: Record<string, unknown>;
}) {
  const { plasmicData, queryCache } = props;
  const router = useRouter();

  // Обработка ошибок и отсутствия данных
  if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Не удалось загрузить данные Plasmic');
    }
    return <Error statusCode={404} />;
  }

  const pageMeta = plasmicData.entryCompMetas[0];

  return (
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={plasmicData}
      prefetchedQueryData={queryCache}
      pageRoute={pageMeta.path}
      pageParams={pageMeta.params}
      pageQuery={router.query}
    >
      <PlasmicComponent component={pageMeta.displayName} />
    </PlasmicRootProvider>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { catchall } = context.params ?? {};
  const plasmicPath = typeof catchall === 'string' ? catchall : Array.isArray(catchall) ? `/${catchall.join('/')}` : '/';

  try {
    const plasmicData = await PLASMIC.maybeFetchComponentData(plasmicPath);

    if (!plasmicData) {
      // non-Plasmic catch-all
      return { props: {}, notFound: context.preview ? false : true };
    }

    const pageMeta = plasmicData.entryCompMetas[0];

    // Минимизируем данные, но сохраняем необходимые компоненты
    const minimalPlasmicData: ComponentRenderData = {
      ...(plasmicData as ComponentRenderData)
    };

    // Cache the necessary data fetched for the page
    const queryCache = await extractPlasmicQueryData(
      <PlasmicRootProvider
        loader={PLASMIC}
        prefetchedData={plasmicData}
        pageRoute={pageMeta.path}
        pageParams={pageMeta.params}
      >
        <PlasmicComponent component={pageMeta.displayName} />
      </PlasmicRootProvider>
    );

    // Use revalidate if you want incremental static regeneration
    return {
      props: {
        plasmicData: minimalPlasmicData,
        queryCache
      },
      revalidate: 60
    };
  } catch (error) {
    console.error("Error fetching Plasmic data:", error);
    return {
      props: {},
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pageModules = await PLASMIC.fetchPages();

  // Создаем пути для всех страниц из Plasmic
  const plasmicPaths = pageModules.map((mod) => ({
    params: {
      catchall: mod.path === "/" ? [] : mod.path.substring(1).split("/"),
    },
  }));

  // Добавляем корневой путь явно
  const paths = [
    { params: { catchall: [] } }, // Это корневой путь "/"
    ...plasmicPaths
  ];

  return {
    paths,
    // Используем blocking для лучшей SEO
    fallback: "blocking",
  };
}
