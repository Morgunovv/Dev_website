import React, { useEffect, useState } from 'react';
import { getGlobalData } from '../lib/api';

interface GlobalDataProps {
    children: (data: any, loading: boolean) => React.ReactNode;
}

export const GlobalData: React.FC<GlobalDataProps> = ({ children }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const response = await getGlobalData();
                setData(response?.data?.attributes || null);
                setError(null);
            } catch (err) {
                console.error('Ошибка загрузки глобальных данных:', err);
                setError('Не удалось загрузить глобальные данные');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <>
            {error ? (
                <div>Ошибка: {error}</div>
            ) : (
                children(data, loading)
            )}
        </>
    );
}; 