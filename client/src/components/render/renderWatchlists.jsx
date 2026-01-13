import { useNavigate } from 'react-router';
import { useWatchlists } from '../../hooks/watchlists/useWatchlists';
import { useDeleteWatchlist } from '../../hooks/watchlists/useDeleteWatchlist';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import List from "../List";

export default function RenderWatchlists ({ count }) {
    const { watchlists, loading, error, setWatchlists, refetch } = useWatchlists();
    const { execute: deleteExecute, targetWatchlistId, loading: deleteLoading, error: deleteError } = useDeleteWatchlist();
    const navigate = useNavigate();
    console.log('Watchlists: ', watchlists);

    useEffect(() => {
        if (!watchlists || !count) return null;
        count(watchlists.length);
    }, [watchlists])

    const handleDeleteWatchlist = async (id) => {
        console.log("[HANDLE DELETE WATCHLIST]: id -", id);
        if (!id) return null;

        setWatchlists(prev => {
            if (!prev) return null;

            console.log('isArray?', Array.isArray(watchlists), watchlists);
            const newList = watchlists.filter(i => i.id !== id);
            return newList;
        });

        try {
            await deleteExecute(id);
        } catch (err) {
            console.error(err);
            refetch();
        };
    }

    if (error || deleteError) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '75vh' }}>
                <Typography variant='h4' color='secondary.main' fontWeight={'bold'}>Error: {error}</Typography>
            </Box>
        )
    };
    
    if (loading || deleteLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '75vh' }}>
                <CircularProgress size={56} />
            </Box>
        )
    }

    if (watchlists.length === 0) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '50vh', marginTop: 18, }}>
                <Typography>You don't have any watchlists. Create one!</Typography>
            </Box>
        );
    };

    return (
        <>
            <List
                items={watchlists}
                actionLabel="View More"
                onAction={(i) => handleDeleteWatchlist(watchlists[i].id)}
                onItemClick={(i) => navigate(`/watchlists/${watchlists[i].id}`)}
                version={'tertiary'}
                sx={{ my: 56, }}
            />
        </>
    );
}