import { useState, useCallback, useEffect } from 'react';
import { deleteWatchlist } from '../../services/watchlists';

export function useDeleteWatchlist () {
    const [ targetWatchlistId, setTargetWatchlistId ] = useState(null);
    const [ loading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {

        console.log("targetWatchlistId: ", targetWatchlistId);
    }, [ targetWatchlistId ]);

    const execute = useCallback( async (id) => {
        try {
            setIsLoading(true);
            setError(null);
            console.log('[ EXECUTE DELETE WATCHLIST HOOK ] - targetWatchlistId: ', id);

            const data = await deleteWatchlist(id);
            if (!data) throw new Error("Error in deletion", err);
            return data;
        } catch (err) {
            const message = err.response?.data?.error || err.message;
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

  return { execute, targetWatchlistId, setTargetWatchlistId, loading, error };
}