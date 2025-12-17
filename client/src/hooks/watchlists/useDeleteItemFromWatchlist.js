import { useState, useCallback } from 'react';
import { deleteItemFromWatchlist } from '../../services/watchlists';

export function useDeleteItemFromWatchlist () {
    const [ targetWatchlistId, setTargetWatchlistId ] = useState(null);
    const [ loading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const execute = useCallback( async (watchlistId, gameID) => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await deleteItemFromWatchlist(watchlistId, gameID);
            setTargetWatchlistId(watchlistId);
            return data;
        } catch (err) {
            const message = err.response?.data?.error || err.message;
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

  return { execute, targetWatchlistId, loading, error };
}