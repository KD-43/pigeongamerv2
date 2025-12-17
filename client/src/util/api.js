import axios from 'axios';
import { getOrCreateUserId } from './userId';

const api = axios.create({
    baseURL: '/api',
    timeout: 8000,
});

api.interceptors.request.use((config) => {
    const anonId = getOrCreateUserId();
    if (anonId) {
        config.headers['x-anon-id'] = anonId;
    };
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;