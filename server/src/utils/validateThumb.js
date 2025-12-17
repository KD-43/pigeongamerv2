import { URL } from 'node:url';

const ALLOWED_HOSTS = new Set([
    'shared.fastly.steamstatic.com',
    'cdn.steamstatic.com',
    'steamcdn-a.akamaihd.net',
    'steamuserimages-a.akamaihd.net',
    'images.akamai.steamusercontent.com',
]);

const IMAGE_REGEX = /\.(jpg|jpeg|png)(\?.*)?$/i;

export function isAllowedImageUrl(raw) {
    try {
        const u = new URL(raw);

        if (u.protocol !== 'https:') return false;

        if (!ALLOWED_HOSTS.has(u.hostname)) return false;

        if (!IMAGE_REGEX.test(u.pathname + u.search)) return false;

        return true;
    } catch {
        return false;
    }
}

export function sanitizeThumbnail(url) {
    return isAllowedImageUrl(url) ? url : '';
}
