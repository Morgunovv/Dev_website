import axios from 'axios';

// Адрес Strapi API на Railway
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://ваш-strapi-адрес-на-railway.app';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Настройка клиента axios с базовым URL и заголовками
const apiClient = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {})
    }
});

// Получение списка записей из коллекции
export async function fetchCollection(collection: string, params = {}) {
    try {
        const response = await apiClient.get(`/${collection}`, { params });
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении коллекции ${collection}:`, error);
        return { data: [] };
    }
}

// Получение одной записи из коллекции по ID
export async function fetchSingleItem(collection: string, id: string, params = {}) {
    try {
        const response = await apiClient.get(`/${collection}/${id}`, { params });
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении записи ${id} из коллекции ${collection}:`, error);
        return { data: null };
    }
}

// Получение записи по slug (для статей, страниц и т.д.)
export async function fetchItemBySlug(collection: string, slug: string, params = {}) {
    try {
        const response = await apiClient.get(`/${collection}`, {
            params: {
                ...params,
                filters: {
                    slug: {
                        $eq: slug
                    }
                }
            }
        });
        return response.data.data.length > 0 ? response.data.data[0] : null;
    } catch (error) {
        console.error(`Ошибка при получении записи со slug ${slug}:`, error);
        return null;
    }
}

// Функция для добавления полного URL к изображению из Strapi
export function getStrapiMedia(media: any) {
    if (!media) return null;

    const imageUrl = media.url.startsWith('/')
        ? `${API_URL}${media.url}`
        : media.url;

    return imageUrl;
}

// Общий метод для получения глобальных данных сайта
export async function getGlobalData() {
    try {
        const response = await apiClient.get('/global', {
            params: {
                populate: 'deep,5'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении глобальных данных:', error);
        return { data: null };
    }
} 