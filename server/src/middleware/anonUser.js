export function requireAnonUser (req, res, next) {
    const anonId = req.headers['x-anon-id'];
    if (!anonId) {
        return res.status(400).json({ error: 'Missing anonymous user ID' });
    };

    req.anonUserId = anonId;
    next();
}