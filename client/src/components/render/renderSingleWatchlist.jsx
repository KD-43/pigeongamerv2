import { useNavigate } from "react-router";
import Watchlist from "../WatchlistComponent";
import { Typography, CircularProgress, Box, Grid, useTheme } from "@mui/material";
import ErrorRender from "./errorCodeRender";

export default function RenderSingleWatchlist ({ watchlist, watchlistStatus, deleteCallbackStatus, deleteCallback }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const { watchlistLoading, watchlistError } = watchlistStatus;

    if (watchlistError) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '75vh' }}>
                <ErrorRender code={error.error} />
            </Box>
        )
    };
    
    if (watchlistLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '75vh' }}>
                <CircularProgress size={56} />
            </Box>
        )
    }

    return (
        <>
            <Typography variant='h3' fontWeight={'bold'} sx={{ mt: 6, color: 'black'}}>{watchlist.name}</Typography>
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
                // onItemClick={(i) => console.log('Clicked item', items[i])}
                sx={{ my: 56, }}
            />
        </>
    )
}