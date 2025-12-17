import { useEffect, useState } from 'react';
import { fetchTrendingDeals } from '../../services/deals';

export function useTrendingDeals() {
    const [ trendingDeals, setTrendingDeals ] = useState([]);
    const [ loading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchTrendingDeals();
                if (data.status < 200 || data.status >= 300) {
                    throw new Error(data.message || "Unknown error");
                };
                if (!cancelled) {
                    setTrendingDeals(data);
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

    return { trendingDeals, loading, error, setTrendingDeals };

};