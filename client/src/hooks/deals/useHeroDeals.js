import { useEffect, useState } from 'react';
import { fetchHeroDeals } from '../../services/deals';

export function useHeroDeals() {
    console.log('useHeroDeals: hook called');
    const [ heroDeals, setHeroDeals ] = useState([]);
    const [ loading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        console.log('useHeroDeals: effect running');
        let cancelled = false;

        async function load() {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchHeroDeals();
                if (data.status < 200 || data.status >= 300) {
                    throw new Error(data.message || "Unknown error");
                };
                if (!cancelled) {
                    setHeroDeals(data);
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

    return { heroDeals, loading, error, setHeroDeals };

};