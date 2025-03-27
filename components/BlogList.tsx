import React from 'react';
import { StrapiCollection } from './StrapiCollection';
import styles from '../styles/blog.module.css';

interface BlogListProps {
    className?: string;
}

export const BlogList: React.FC<BlogListProps> = ({ className }) => {
    return (
        <StrapiCollection
            collection="articles"
            limit={10}
            sort="publishedAt:desc"
            className={`${styles.blogList} ${className || ''}`}
            renderItem={(item, index) => (
                <div key={index} className={styles.blogItem}>
                    <h2>{item.attributes.title}</h2>
                    <p className={styles.date}>{new Date(item.attributes.publishedAt).toLocaleDateString('ru-RU')}</p>
                    <div className={styles.summary}>{item.attributes.summary}</div>
                    <a href={`/blog/${item.attributes.slug}`} className={styles.readMore}>
                        Читать дальше
                    </a>
                </div>
            )}
            emptyState={<div>Статьи не найдены</div>}
            loadingState={<div>Загружаем статьи...</div>}
        />
    );
}; 