import express from 'express';
import { cache } from '../middleware/cache.js';
import { fetchHeroDeals, fetchBestDeals, fetchTrendingDeals, fetchRecentDeals, fetchDealsByQuery, fetchDealById } from '../controllers/deals.controller.js';

const router = express.Router();

router.get('/hero', cache(1800), fetchHeroDeals);
router.get('/best', cache(1800), fetchBestDeals);
router.get('/trending', cache(1800), fetchTrendingDeals);
router.get('/recent', cache(1800), fetchRecentDeals);
router.get('/search', cache(1800), fetchDealsByQuery);
router.get('/details', cache(1800), fetchDealById);

export default router;