import React, { useEffect, useState } from 'react';
import { fetchSingleItem, fetchItemBySlug } from '../lib/api';

interface StrapiItemProps {
    collection: string;
    identifier?: string; // id или slug
    isSlug?: boolean;
    className?: string;
    children: (data: any, loading: boolean) => React.ReactNode;
}

export const StrapiItem: React.FC<StrapiItemProps> = ({
    collection,
    identifier,
    isSlug = false,
    className,
    children
}) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!identifier && !isSlug) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                let response;

                if (isSlug) {
                    response = await fetchItemBySlug(collection, identifier || '', {
                        populate: '*'
                    });
                } else {
                    response = await fetchSingleItem(collection, identifier || '', {
                        populate: '*'
                    });
                }

                setData(response?.data || null);
                setError(null);
            } catch (err) {
                console.error('Ошибка загрузки данных:', err);
                setError('Не удалось загрузить данные');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [collection, identifier, isSlug]);

    return (
        <div className={className}>
            {error ? (
                <div>Ошибка: {error}</div>
            ) : (
                children(data, loading)
            )}
        </div>
    );
}; 