import React from 'react';
import { StrapiItem } from './StrapiItem';
import { useRouter } from 'next/router';
import { getStrapiMedia } from '../lib/api';
import styles from '../styles/blog.module.css';

interface BlogPostProps {
    className?: string;
    slug?: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({ className, slug }) => {
    const router = useRouter();
    // Если slug не передан как пропс, берем из URL
    const postSlug = slug || (router.query.slug as string);

    if (!postSlug) {
        return <div className={className}>Статья не найдена</div>;
    }

    return (
        <StrapiItem
            collection="articles"
            identifier={postSlug}
            isSlug={true}
            className={`${styles.blogPost} ${className || ''}`}
        >
            {(data, loading) => {
                if (loading) return <div>Загрузка статьи...</div>;
                if (!data) return <div>Статья не найдена</div>;

                const { title, content, publishedAt, image } = data.attributes;

                return (
                    <article>
                        <h1>{title}</h1>
                        <p className={styles.date}>{new Date(publishedAt).toLocaleDateString('ru-RU')}</p>

                        {image && (
                            <div className={styles.featuredImage}>
                                <img
                                    src={getStrapiMedia(image.data.attributes)}
                                    alt={title}
                                />
                            </div>
                        )}

                        <div
                            className={styles.content}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </article>
                );
            }}
        </StrapiItem>
    );
}; 