import { useEffect, useState, useCallback } from 'react';
import { createWatchlist } from '../../services/watchlists';

export function useCreateWatchlist () {
    const [ watchlist, setWatchlist ] = useState([]);
    const [ loading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const execute = useCallback( async (name) => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await createWatchlist(name);
            setWatchlist(data);
            return data;
        } catch (err) {
            const message = err.response?.data?.error || err.message;
            setError(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { execute, watchlist, loading, error };
}