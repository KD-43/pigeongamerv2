import { useEffect, useState } from 'react';
import { fetchWatchlistsSummary } from '../../services/watchlists';

export function useWatchlists() {
    const [ watchlists, setWatchlists ] = useState([]);
    const [ loading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);

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

    return { watchlists, loading, error, setWatchlists };

};