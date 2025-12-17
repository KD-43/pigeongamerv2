import api from '../util/api';

export async function fetchHeroDeals() {
    const res = await api.get('/deals/hero');
    return res.data;
};

export async function fetchTrendingDeals() {
    const res = await api.get('/deals/trending');
    return res.data;
};

export async function fetchRecentDeals() {
    const res = await api.get('/deals/recent');
    return res.data;
};

export async function fetchDealsByQuery(query) {
    const res = await api.get('/deals/search', { 
        params: { q: query }
    });
    return res.data;
};

export async function fetchDealById(dealId) {
    const res = await api.get(`/deals/details`, {
        params: { id: dealId },
    });
    return res.data;
};