import axios from 'axios';

export const http = axios.create({
    baseURL: process.env.baseURL || 'https://www.cheapshark.com/api/1.0',
    timeout: 8000,
    headers: {
        "User-Agent": "PigeonGamer/2.0",
    }
});

http.interceptors.request.use((config) => {
    console.log(
        `[CHEAPSHARK REQUEST] → ${config.method?.toUpperCase()} ${config.url}`,
        config.params || ''
    );
    return config;
});