import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { StrapiCollection } from "./components/StrapiCollection";
import { StrapiItem } from "./components/StrapiItem";
import { BlogList } from "./components/BlogList";
import { BlogPost } from "./components/BlogPost";
import { GlobalData } from "./components/GlobalData";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID || "uo3n29zhyDGu3p4SZ2GCH9",
      token: process.env.NEXT_PUBLIC_PLASMIC_PROJECT_TOKEN || "H5rkt7nFAkilcAti8HQE9zUEMPlBD9LQIrZAdfXmh5kWXRff7fVznU7TXSvIaYNEA2ROxhQy2KVsr9pJtxyiA",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: process.env.NEXT_PUBLIC_PLASMIC_PREVIEW === "true",
});

// Регистрируем компоненты для Strapi
PLASMIC.registerComponent(StrapiCollection, {
  name: "StrapiCollection",
  props: {
    collection: {
      type: "string",
      defaultValue: "articles",
      helpText: "Название коллекции в Strapi"
    },
    limit: {
      type: "number",
      defaultValue: 10,
      helpText: "Максимальное количество элементов"
    },
    sort: {
      type: "string",
      defaultValue: "publishedAt:desc",
      helpText: "Сортировка (например, 'publishedAt:desc')"
    },
    renderItem: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Элемент"
      },
      allowedComponents: ["Box", "Text", "Image", "Button", "Link"],
      renderPropParams: ["item", "index"]
    },
    emptyState: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Нет данных"
      }
    },
    loadingState: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Загрузка..."
      }
    }
  }
});

PLASMIC.registerComponent(StrapiItem, {
  name: "StrapiItem",
  props: {
    collection: {
      type: "string",
      defaultValue: "articles",
      helpText: "Название коллекции в Strapi"
    },
    identifier: {
      type: "string",
      helpText: "ID или slug записи"
    },
    isSlug: {
      type: "boolean",
      defaultValue: false,
      helpText: "Является ли идентификатор slug-ом (иначе это ID)"
    },
    children: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Содержимое элемента"
      },
      allowedComponents: ["Box", "Text", "Image", "Button", "Link", "Section"],
      renderPropParams: ["data", "loading"]
    }
  }
});

// Регистрируем готовые компоненты для блога
PLASMIC.registerComponent(BlogList, {
  name: "BlogList",
  props: {
    className: {
      type: "string",
      helpText: "Класс CSS для стилизации списка блога"
    }
  }
});

PLASMIC.registerComponent(BlogPost, {
  name: "BlogPost",
  props: {
    className: {
      type: "string",
      helpText: "Класс CSS для стилизации статьи"
    },
    slug: {
      type: "string",
      helpText: "Slug статьи из Strapi (если не указан, берется из URL)"
    }
  }
});

// Регистрируем компонент для глобальных данных
PLASMIC.registerComponent(GlobalData, {
  name: "GlobalData",
  props: {
    children: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Глобальные данные"
      },
      renderPropParams: ["data", "loading"]
    }
  }
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// PLASMIC.registerComponent(...);
