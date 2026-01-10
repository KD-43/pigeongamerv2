import { useState, useCallback } from 'react';
import { deleteWatchlist } from '../../services/watchlists';

export function useDeleteWatchlist () {
    const [ targetWatchlistId, setTargetWatchlistId ] = useState(null);
    const [ loading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const execute = useCallback( async (watchlistId) => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await deleteWatchlist(watchlistId);
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