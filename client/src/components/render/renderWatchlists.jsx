import { useNavigate } from 'react-router';
import { useWatchlists } from '../../hooks/watchlists/useWatchlists';
import { Box, Typography, CircularProgress } from '@mui/material';
import List from "../List";

export default function renderWatchlists () {
    const { watchlists, loading, error } = useWatchlists();
    const navigate = useNavigate();
    console.log('Watchlists: ', watchlists);

    if (error) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '75vh' }}>
                <Typography variant='h4' color='secondary.main' fontWeight={'bold'}>Error: {error}</Typography>
            </Box>
        )
    };
    
    if (loading) {
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
    }

    return (
        <List 
            items={watchlists}
            actionLabel="View More"
            // onAction={() => console.log('View All clicked')}
            onItemClick={(i) => navigate(`/watchlists/${watchlists[i].id}`)}
            version={'tertiary'}
            sx={{ my: 56, }}
        />
    );
}