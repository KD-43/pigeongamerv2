import api from '../util/api';

export async function fetchWatchlists() {
    const res = await api.get('/watchlists');
    return res.data;
};

export async function fetchWatchlistsSummary() {
    const res = await api.get('/watchlists/summary');
    return res.data;
};

export async function fetchWatchlistById(id) {
    const res = await api.get(`/watchlists/${id}`);
    return res.data;
};

export async function createWatchlist(name) {
    const res = await api.post('/watchlists', { name });
    return res.data;
};

export async function addItemToWatchlist(id, { gameID, title, storeID, currentPrice, dealID }) {
    const res = await api.post(`/watchlists/${id}/items`, { gameID, title, storeID, currentPrice, dealID });
    return res.data;
};

export async function deleteItemFromWatchlist(id, gameID) {
    const res = await api.delete(`/watchlists/${id}/items`, { data: { gameID } });
    return res.data;
};

export async function updateWatchlistName(id, name) {
    const safeName = String(name).replace(/[^a-zA-Z0-9]/g, '');
    const res = await api.patch(`/watchlists/${id}`, { safeName });
    return res.data;
};

export async function deleteWatchlist() {
    const res = await api.delete(`/watchlists/${id}`);
    return res.data;
};

export async function replaceWatchlistItem(id, gameID, candidate) {
    const safeGameID = encodeURIComponent(gameID);
    const res = await api.patch(`/watchlists/${id}/items/${safeGameID}`, { candidate });
    return res.data;
};
