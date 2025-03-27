import React from 'react';
import { GlobalData } from './GlobalData';
import { getStrapiMedia } from '../lib/api';
import styles from '../styles/header.module.css';

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
    return (
        <GlobalData>
            {(data, loading) => {
                if (loading) return <div className={`${styles.header} ${className || ''}`}>Загрузка...</div>;

                const logo = data?.logo?.data?.attributes;
                const siteTitle = data?.siteTitle || 'Наш сайт';

                return (
                    <header className={`${styles.header} ${className || ''}`}>
                        <div className={styles.container}>
                            <div className={styles.logoWrapper}>
                                {logo ? (
                                    <img
                                        src={getStrapiMedia(logo)}
                                        alt={siteTitle}
                                        className={styles.logo}
                                    />
                                ) : (
                                    <div className={styles.logoPlaceholder}>{siteTitle}</div>
                                )}
                            </div>

                            <nav className={styles.nav}>
                                <ul className={styles.navList}>
                                    <li className={styles.navItem}>
                                        <a href="/" className={styles.navLink}>Главная</a>
                                    </li>
                                    <li className={styles.navItem}>
                                        <a href="/blog" className={styles.navLink}>Блог</a>
                                    </li>
                                    <li className={styles.navItem}>
                                        <a href="/about" className={styles.navLink}>О нас</a>
                                    </li>
                                    <li className={styles.navItem}>
                                        <a href="/contact" className={styles.navLink}>Контакты</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </header>
                );
            }}
        </GlobalData>
    );
}; 