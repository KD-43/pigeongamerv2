import { useEffect, useState, useCallback } from 'react';
import { fetchWatchlistsSummary } from '../../services/watchlists';

export function useWatchlists() {
    const [ watchlists, setWatchlists ] = useState([]);
    const [ loading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const refetch = useCallback(async () => {

        try {
            setIsLoading(true);
            setError(null);

            const data = await fetchWatchlistsSummary();
            setWatchlists(data);
            return data;
        } catch (err) {
            const message = err.response?.data?.error || err.message;
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchWatchlistsSummary();
                if (!cancelled) {
                    setWatchlists(data);
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
    },[]);

    return { watchlists, loading, error, setWatchlists, refetch };

};