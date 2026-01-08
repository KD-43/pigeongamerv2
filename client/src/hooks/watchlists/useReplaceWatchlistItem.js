import { useState, useCallback } from 'react';
import { replaceWatchlistItem } from '../../services/watchlists';

export function useReplaceWatchlistItem () {
    const [ targetWatchlistId, setTargetWatchlistId ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const execute = useCallback( async (watchlistId, gameID, candidate) => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await replaceWatchlistItem(watchlistId, gameID, candidate);
            setTargetWatchlistId(watchlistId);
            return data;
        } catch (err) {
            const message = err.response?.data?.error || err.response?.data?.message || err.message || "Unknown error";
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

  return { execute, isLoading, error };
}