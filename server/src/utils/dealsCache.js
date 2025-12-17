const store = new Map();

export function setCache(key, data, ttlMs) {
    const now = Date.now();
    store.set(key, { time: now, ttl: ttlMs, data });
};

export function getCache(key) {
    const now = Date.now();
    const entry = store.get(key);
    if (!entry) return null;

    if (now - entry.time > entry.ttl) {
        store.delete(key);
        return null;
    }

    return entry.data;
};

export function clearCache () {
    store.clear();
};