import React, { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

interface StrapiCollectionProps {
    collection: string;
    limit?: number;
    sort?: string;
    className?: string;
    renderItem: (item: any, index: number) => React.ReactNode;
    emptyState?: React.ReactNode;
    loadingState?: React.ReactNode;
}

export const StrapiCollection: React.FC<StrapiCollectionProps> = ({
    collection,
    limit = 10,
    sort = 'id:desc',
    className,
    renderItem,
    emptyState = <div>Нет данных</div>,
    loadingState = <div>Загрузка...</div>
}) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const response = await fetchCollection(collection, {
                    pagination: { limit },
                    sort: [sort],
                    populate: '*'
                });

                setData(response.data || []);
                setError(null);
            } catch (err) {
                console.error('Ошибка загрузки данных:', err);
                setError('Не удалось загрузить данные');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [collection, limit, sort]);

    if (loading) {
        return <div className={className}>{loadingState}</div>;
    }

    if (error) {
        return <div className={className}>Ошибка: {error}</div>;
    }

    if (!data.length) {
        return <div className={className}>{emptyState}</div>;
    }

    return (
        <div className={className}>
            {data.map((item, index) => renderItem(item, index))}
        </div>
    );
}; 