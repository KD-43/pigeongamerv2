import { useNavigate } from 'react-router';
import { useWatchlists } from '../../hooks/watchlists/useWatchlists';
import { Box, Typography, CircularProgress, List, ListItemButton, ListItemText } from '@mui/material';
import { useAddItemToWatchlist } from '../../hooks/watchlists/useAddItemToWatchlist';

export default function RenderWatchlistsNames ({ items, loading, error }) {
    const { execute, targetWatchlistId, loading: addItemLoading, error: addItemError  } = useAddItemToWatchlist();
    const navigate = useNavigate();

    if (error) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
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

    if (items.length === 0) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '50vh', marginTop: 18, }}>
                <Typography>You don't have any watchlists. Create one!</Typography>
            </Box>
        );
    }

    return (
        <List dense disablePadding>
            {items.map((item, index) => (
                <ListItemButton
                    key={item.value}
                    onClick={() => execute(item.id, )}
                    sx={{ px: 4, }}
                >
                    <ListItemText primary={item.label} />
                </ListItemButton>
            ))}
        </List>
    );
}