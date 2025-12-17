import { useState, useCallback } from 'react';
import { fetchDealsByQuery } from '../../services/deals';

export function useSearchForDeals () {
    const [ queryDeals, setQueryDeals ] = useState();
    const [ loading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const execute = useCallback( async (query) => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await fetchDealsByQuery(query);
            if (data.status < 200 || data.status >= 300) {
                throw new Error(data.message || "Unknown error");
            };
            setQueryDeals(data);
            return data;
        } catch (err) {
            const message = err.response?.data?.error || err.message;
            setError(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

  return { execute, queryDeals, loading, error };
}