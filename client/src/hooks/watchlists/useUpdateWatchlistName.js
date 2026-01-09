import { useEffect, useState, useCallback } from 'react';
import { updateWatchlistName } from '../../services/watchlists';

export function useUpdateWatchlistName () {
    const [ watchlist, setWatchlist ] = useState();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const execute = useCallback( async (id, name) => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await updateWatchlistName(id, name);
            setWatchlist(data);
            return data;
        } catch (err) {
            const message = err.response?.data?.error || err.response?.data?.message || err.message || "Unknown error";
            setError(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { execute, watchlist, isLoading, error };
}