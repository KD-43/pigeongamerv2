import { useState, useCallback } from 'react';
import { addItemToWatchlist } from '../../services/watchlists';

export function useAddItemToWatchlist () {
    const [ targetWatchlistId, setTargetWatchlistId ] = useState(null);
    const [ loading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const execute = useCallback( async (watchlistId, item) => {
        try {
            setIsLoading(true);
            setError(null);
            const { dealId, gameInfo } = item;

            const payload = {
                gameID: gameInfo.gameID,
                title: gameInfo.name,
                storeID: gameInfo.storeID,
                dealID: dealId,
                currentPrice: gameInfo.salePrice,
            };

            const data = await addItemToWatchlist(watchlistId, payload);
            setTargetWatchlistId(watchlistId);
            return data;
        } catch (err) {
            const message = err.response?.data?.error || err.message;
            setError(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

  return { execute, targetWatchlistId, loading, error };
}