export default function errorHandler(err, req, res, next) {
    console.error('❌ Error', err);

    // console.log("Status =", err.response?.status);
    // console.log("Headers =", err.response?.headers);
    // console.log("CheapShark message =", err.response?.data);

    if (err.isAxiosError) {
        const status = err.response?.status || 502;
        return res.status(status).json({
            error: 'Upstream Cheapshark error',
            detail: err.message,
        });
    };

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation error',
            details: Object.values(err.errors).map((e) => e.message),
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            error: 'Duplicate value',
            detail: err.keyValue,
        });
    }

    const status = err.status || 500;
    res.status(status).json({
        error: err.message || 'Internal server error',
    });
};