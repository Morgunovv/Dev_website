import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { BlogPost } from '../../components/BlogPost';
import { fetchCollection } from '../../lib/api';
import Head from 'next/head';

// Интерфейс для пропсов страницы
interface BlogPostPageProps {
    slug: string;
}

export default function BlogPostPage({ slug }: BlogPostPageProps) {
    return (
        <>
            <Head>
                <title>Статья блога</title>
                <meta name="description" content="Статья блога" />
            </Head>
            <BlogPost slug={slug} />
        </>
    );
}

// Генерация статических путей для всех статей
export const getStaticPaths: GetStaticPaths = async () => {
    try {
        // Получаем все статьи из Strapi
        const response = await fetchCollection('articles', {
            fields: ['slug'],
            pagination: { limit: 100 }
        });

        // Формируем пути для каждой статьи
        const paths = response.data.map((article: any) => ({
            params: { slug: article.attributes.slug }
        }));

        return {
            paths,
            fallback: 'blocking' // Если страница не была предварительно сгенерирована, сервер попытается сгенерировать ее
        };
    } catch (error) {
        console.error('Ошибка при получении статей:', error);
        return {
            paths: [],
            fallback: 'blocking'
        };
    }
};

// Получение данных для каждой страницы
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;

    // Возвращаем slug для использования в компоненте
    return {
        props: {
            slug
        },
        // Пересоздавать страницу каждый час
        revalidate: 3600
    };
}; 