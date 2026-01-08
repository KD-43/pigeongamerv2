import { useEffect, useState, useCallback } from 'react';
import { fetchWatchlistById } from '../../services/watchlists';

export function useSingleWatchlist(id) {
    const [ watchlist, setWatchlist ] = useState(null);
    const [ loading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const refetch = useCallback(async () => {
        if (!id) return null;

        try {
            setIsLoading(true);
            setError(null);

            const data = await fetchWatchlistById(id);
            setWatchlist(data);
            return data;
        } catch (err) {
            const message = err.response?.data?.error || err.message;
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (!id) return;

        let cancelled = false;

        async function load() {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchWatchlistById(id);
                if (!cancelled) {
                    setWatchlist(data);
                };
            } catch (err) {
                if (!cancelled) {
                    setError(err.response?.data?.error || err.message);
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    },[id]);

    return { watchlist, loading, error, setWatchlist, refetch };

};