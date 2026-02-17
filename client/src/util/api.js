import axios from 'axios';
import { getOrCreateUserId } from './userId';

const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

const api = axios.create({
    baseURL: baseURL,
    timeout: 30000,
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