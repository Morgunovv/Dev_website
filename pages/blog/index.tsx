import React from 'react';
import { GetStaticProps } from 'next';
import { BlogList } from '../../components/BlogList';
import Head from 'next/head';

export default function BlogIndexPage() {
    return (
        <>
            <Head>
                <title>Блог</title>
                <meta name="description" content="Список всех статей блога" />
            </Head>
            <div className="container">
                <h1>Блог</h1>
                <BlogList />
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    // Можем предварительно загрузить данные, если нужно
    return {
        props: {},
        // Пересоздавать страницу каждый час
        revalidate: 3600
    };
}; 