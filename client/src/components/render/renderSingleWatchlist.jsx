import { useNavigate } from "react-router";
import Watchlist from "../WatchlistComponent";
import { Typography, CircularProgress, Box } from "@mui/material";
import ErrorRender from "./errorCodeRender";

export default function RenderSingleWatchlist ({ watchlist, watchlistStatus, deleteCallbackStatus, deleteCallback }) {
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
            <Typography variant='h4' fontWeight={'bold'} sx={{ mt: 6, color: 'primary.main'}}>{watchlist.name}</Typography>
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