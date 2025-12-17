import express from 'express';
import { cache } from '../middleware/cache.js';
import { fetchHeroDeals, fetchBestDeals, fetchTrendingDeals, fetchRecentDeals, fetchDealsByQuery, fetchDealById } from '../controllers/deals.controller.js';

const router = express.Router();

router.get('/hero', cache(1200), fetchHeroDeals);
router.get('/best', cache(1200), fetchBestDeals);
router.get('/trending', cache(1200), fetchTrendingDeals);
router.get('/recent', cache(1200), fetchRecentDeals);
router.get('/search', cache(1200), fetchDealsByQuery);
router.get('/details', cache(1200), fetchDealById);

export default router;