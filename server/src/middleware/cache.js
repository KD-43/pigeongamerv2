const cacheStore = new Map();
const inFlight = new Map();

export function cache(seconds = 30) {
    return (req, res, next) => {
        if (req.method !== 'GET') return next();

        const key = req.originalUrl;
        const now = Date.now();
        const cached = cacheStore.get(key);

        console.log('[CACHE] request:', req.originalUrl);

        if (cached && now - cached.time < seconds * 1000) {
            console.log('[CACHE] HIT:', key);
            return res.json(cached.data);
        } else {
            console.log('[CACHE] MISS:', key);
        };

        if (inFlight.has(key)) {
            console.log('[CACHE] IN-FLIGHT DEDUPE:', key);
            return inFlight.get(key).then(
                (data) => res.json(data),
                (err) => next(err)
            );
        };

        const originalJson = res.json.bind(res);

        const promise = new Promise((resolve, reject) => {
            res.json = (body) => {
                cacheStore.set(key, { time: Date.now(), data: body });
                resolve(body);
                return originalJson(body);
            };

            res.on('finish', () => {
                inFlight.delete(key);
            });
            res.on('error', (err) => {
                inFlight.delete(key);
                reject(err);
            });
        });

        inFlight.set(key, promise);
        
        next();
    };
};