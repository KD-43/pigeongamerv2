import axios from 'axios';

export const http = axios.create({
    baseURL: process.env.baseURL || 'https://www.cheapshark.com/api/1.0',
    timeout: 30000,
});

http.interceptors.request.use((config) => {
    console.log(
        `[CHEAPSHARK REQUEST] → ${config.method?.toUpperCase()} ${config.url}`,
        config.params || ''
    );
    return config;
});