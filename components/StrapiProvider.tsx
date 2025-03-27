import React, { createContext, useContext, useState, useEffect } from 'react';
import { getGlobalData, fetchCollection } from '../lib/api';

// Тип для данных из Strapi
type StrapiContextType = {
    globalData: any;
    collections: Record<string, any>;
    loading: boolean;
    fetchCollectionData: (collection: string, params?: any) => Promise<any>;
};

// Создаем контекст
const StrapiContext = createContext<StrapiContextType>({
    globalData: null,
    collections: {},
    loading: true,
    fetchCollectionData: async () => null,
});

// Хук для использования контекста
export const useStrapiData = () => useContext(StrapiContext);

// Провайдер данных Strapi
export const StrapiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [globalData, setGlobalData] = useState<any>(null);
    const [collections, setCollections] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState<boolean>(true);

    // Загрузка глобальных данных при инициализации
    useEffect(() => {
        const loadGlobalData = async () => {
            try {
                const data = await getGlobalData();
                setGlobalData(data);
            } catch (error) {
                console.error('Ошибка загрузки глобальных данных:', error);
            } finally {
                setLoading(false);
            }
        };

        loadGlobalData();
    }, []);

    // Функция для загрузки данных коллекции
    const fetchCollectionData = async (collection: string, params = {}) => {
        try {
            setLoading(true);
            const data = await fetchCollection(collection, params);

            // Сохраняем данные в состоянии
            setCollections(prev => ({
                ...prev,
                [collection]: data
            }));

            return data;
        } catch (error) {
            console.error(`Ошибка загрузки коллекции ${collection}:`, error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return (
        <StrapiContext.Provider
            value={{
                globalData,
                collections,
                loading,
                fetchCollectionData
            }}
        >
            {children}
        </StrapiContext.Provider>
    );
}; 