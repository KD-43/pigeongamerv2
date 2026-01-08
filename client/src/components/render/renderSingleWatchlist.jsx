import { useNavigate } from "react-router";
import Watchlist from "../WatchlistComponent";
import { Typography, CircularProgress, Box, Grid, useTheme, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import ErrorRender from "./errorCodeRender";
import { useReplaceWatchlistItem } from "../../hooks/watchlists/useReplaceWatchlistItem";
import { useCallback } from "react";

export default function RenderSingleWatchlist ({ watchlist, watchlistStatus, deleteCallbackStatus, deleteCallback, replaceCallback, replaceCallbackStatus }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const { watchlistLoading, watchlistError } = watchlistStatus;
    const { replaceIsLoading, replaceError } = replaceCallbackStatus;

    if (watchlistError || replaceError) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '75vh' }}>
                <ErrorRender code={error.error} />
            </Box>
        )
    };
    
    if (watchlistLoading || replaceIsLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '75vh' }}>
                <CircularProgress size={56} />
            </Box>
        )
    };

    return (
        <>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'start', alignItems: 'baseline', mt: 6,}}>
                <Typography variant='h2' fontWeight={'900'} sx={{ color: 'black'}}>{watchlist.name}</Typography>
                <IconButton color="primary" sx={{ backgroundColor: 'tertiary.main', }}>
                    <Edit size="medium" color="primary.main" />
                </IconButton>
            </Box>
            <Box sx={{ mt: 2, mb: 5, display: 'flex', justifyContent: 'start', gap: 3, }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2, py: 1, backgroundColor: 'tertiary.main', borderRadius: 8, }}>
                        <Typography variant="body1" fontWeight={'900'}>
                            {watchlist.items.length} items being tracked
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 3, borderRadius: 8, border: `3px solid ${theme.palette.tertiary.main}`, px: 3, }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Typography variant="body1" fontWeight={'900'}>LEGEND:</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Box sx={{ width: '24px', height: '12px', backgroundColor: 'primary.main', borderRadius: 2, }} />
                        <Typography variant="body1">Price dropped!</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Box sx={{ width: '24px', height: '12px', backgroundColor: 'secondary.main', borderRadius: 2, }} />
                        <Typography variant="body1">Price raised!</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: theme.palette.tertiary.main, borderRadius: 40, height: 48, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 3, py: 2,  }}>
                <Grid container spacing={1} sx={{}}>
                    <Grid size={2} sx={{ display: 'grid', placeItems: 'center'}}><Typography variant="body1" fontWeight={'900'}>TITLE</Typography></Grid>
                    <Grid size={2} sx={{ display: 'grid', placeItems: 'center'}}><Typography variant="body1" fontWeight={'900'}>PRICE</Typography></Grid>
                    <Grid size={4} sx={{ display: 'grid', placeItems: 'center'}}><Typography variant="body1" fontWeight={'900'}>LINKS</Typography></Grid>
                    <Grid size={3} sx={{ display: 'grid', placeItems: 'center'}}><Typography variant="body1" fontWeight={'900'}>ACTION</Typography></Grid>
                    <Grid size={1}></Grid>
                </Grid>
            </Box>
            <Watchlist
                items={watchlist.items}
                actionLabel="View More"
                deleteItem={deleteCallback}
                deleteStatus={deleteCallbackStatus}
                onItemClick={(i) => navigate(`/deals/details/${watchlist.items[i].dealID}`)}
                replaceItem={replaceCallback}
                sx={{ my: 56, }}
            />
        </>
    )
}