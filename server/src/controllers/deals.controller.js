import { getBestDeals, getTrendingDeals, getRecentDeals, searchDealsByTitle, getDealById } from '../services/cheapshark.service.js';
import { selectCheapestDealPerGameID } from '../utils/cheapestByGameId.js';
import { sanitizeThumbnail } from '../utils/validateThumb.js';

const HERO_BEST_COUNT = 3;
const HERO_TRENDING_COUNT = 3;

export const fetchHeroDeals = async (req, res, next) => { 
    try { 
        const [ best, trending ] = await Promise.all([
            getBestDeals(req.signal),
            getTrendingDeals(req.signal),
        ]);

        const bestCheapest = selectCheapestDealPerGameID(best);
        const trendingCheapest = selectCheapestDealPerGameID(trending);

        const bestSlice = bestCheapest.slice(0, HERO_BEST_COUNT);
        const trendingSlice = trendingCheapest.slice(0, HERO_TRENDING_COUNT);

        const dealsArr = [...bestSlice, ...trendingSlice];

        res.status(200).json({
            dealsArr
        });
    } catch(err) {
        next(err);
    }
};

export const fetchBestDeals = async (req, res, next) => { 
    try{ 
        const deals = await getBestDeals(req.signal);
        res.json(deals);
    } catch(err) {
        next(err);
    }
};

export const fetchTrendingDeals = async (req, res, next) => { 
    try{ 
        const deals = await getTrendingDeals(req.signal);
        res.json(deals);
    } catch(err) {
        next(err);
    }
};

export const fetchRecentDeals = async (req, res, next) => { 
    try{ 
        const deals = await getRecentDeals(req.signal);
        res.json(deals);
    } catch(err) {
        next(err);
    }
};

export const fetchDealsByQuery = async (req, res, next) => { 
    try{ 
        const q = (req.query.q || '').toString().trim();
        if (!q) {
            return res.status(400).json({ error: 'Query parameter "q" is required' })
        };

        const deals = await searchDealsByTitle(q, req.signal);
        res.json({
            query: q,
            count: deals.length,
            results: deals,
        });
    } catch(err) {
        next(err);
    }
};

export const fetchDealById = async (req, res, next) => { 
    try{ 
        const dealId = (req.query.id || '').toString().trim();

        if (!dealId) {
        return res.status(400).json({ error: 'id query parameter is required' });
        }

        const deal = await getDealById(dealId, req.signal);

        if (!deal || Object.keys(deal).length === 0) {
        return res.status(404).json({ error: 'Deal not found' });
        }

        const sanitizeThumb = sanitizeThumbnail(deal.gameInfo.thumb);
        
        const sanitizedDeal = {
            ...deal,
            gameInfo: {
                ...deal.gameInfo,
                thumb: sanitizeThumb,
            }
        }

        res.status(200).json(sanitizedDeal);
    } catch(err) {
        next(err);
    }
};