import { useState, useEffect } from 'react';
import { fetchDealById } from '../../services/deals';

export function useSpecificDeal (dealId) {
    const [ specificDeal, setSpecificDeal ] = useState();
    const [ loading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if (!dealId) return;

        let cancelled = false;

        async function load() {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchDealById(dealId);
                if (data.status < 200 || data.status >= 300) {
                    throw new Error(data.message || "Unknown error");
                };
                if (!cancelled) {
                    setSpecificDeal(data);
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
    },[dealId]);

  return { specificDeal, loading, error, setSpecificDeal };
}