import { http } from '../utils/http.js';
import { sanitizeThumbnail } from '../utils/validateThumb.js';
import { setCache, getCache, clearCache }from '../utils/dealsCache.js';

const DEAL_CACHE_TTL = 30 * 60 * 1000;

function pickAllowedParams (params = {}) {
    const allowedKeys = new Set([
        'storeID', 'upperPrice', 'lowerPrice', 'onSale', 'AAA', 'sortBy', 'pageNumber', 'pageSize', 'title', 'exact',
    ]);

    const safe = {};
    for (const [key, value] of Object.entries(params)) {
        if (allowedKeys.has(key) && value !== undefined && value !== null && value !== '') {
            safe[key] = value;
        };
    };

    return safe;
};

function buildDealsKey(safeParams) {
    return JSON.stringify(safeParams);
};

export async function getDeals (params, signal) {
    const safeParams = pickAllowedParams(params);
    const key = buildDealsKey(safeParams);

    const cached = getCache(key);
    if (cached) {
        console.log('[DEALS CACHE] HIT for', safeParams);
        return cached;
    };

    console.log('[DEALS CACHE] MISS for', safeParams);
    const response = await http.get('/deals', {
        params: safeParams,
        signal,
    });
    
    const data = response.data.map((deal) => ({
        ...deal,
        thumb: sanitizeThumbnail(deal.thumb),
    }));

    setCache(key, data, DEAL_CACHE_TTL);

    return data;
};

export async function getDealById (dealId, signal) {
    if (!dealId) {
        throw new Error('dealId is required');
    };

    const key = `deal:${dealId}`;
    const cached = getCache(key);
    if (cached) {
        console.log('[DEALS CACHE] HIT for', dealId);
        return cached;
    };

    console.log('[DEALS CACHE] MISS for', dealId);
    const response = await http.get('/deals', {
        params: { id: dealId },
        signal
    });
    
    const data = response.data;

    setCache(key, data, DEAL_CACHE_TTL);

    return data;
};

export async function getBestDeals (signal) {
    return getDeals(
        {
            onSale: 1,
            sortBy: 'DealRating',
            pageSize: 30,
            pageNumber: 0,
        },
        signal
    );
};

export async function getTrendingDeals (signal) {
    const recentDeals = await getDeals(
        {
            onSale: 1,
            sortBy: 'Recent',
            pageSize: 30,
            pageNumber: 0,
        },
        signal
    );

    const sorted = recentDeals
        .map((deal) => ({
            ...deal,
            _ratingNum: Number(deal.dealRating) || 0,
        }))
        .sort((a, b) => b._ratingNum - a._ratingNum)
        .map(({ _ratingNum, ...rest}) => rest);

    return sorted;
};

export async function getRecentDeals (signal) {
    return getDeals(
        {
            onSale: 1,
            sortBy: 'Recent',
            pageSize: 30,
            pageNumber: 0,
        },
        signal
    );
};

export async function searchDealsByTitle (title, signal) {
    return getDeals(
        {
            title,
            onSale: 1,
            sortBy: 'DealRating',
            pageSize: 30,
            pageNumber: 0,
        },
        signal
    );
};

export async function getCheapestDealForTitle (title, signal) {
    const deals = await getDeals(
        {
            title,
            onSale: 1,
            sortBy: 'Price',
            pageSize: 1,
            pageNumber: 0,
        },
        signal
    );

    const best = deals?.[0];
    if (!best) {
        return null;
    };

    return {
        title: best.title,
        storeID: best.storeID,
        dealID: best.dealID,
        currentPrice: Number(best.salePrice),
        normalPrice: Number(best.normalPrice),
        redirectUrl: `https://www.cheapshark.com/redirect?dealID=${encodeURIComponent(best.dealID)}`,
    }
};