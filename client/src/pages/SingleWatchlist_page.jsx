import { useEffect } from 'react';
import { Container, Grid, Box, Typography, useTheme, Button, Stack, CircularProgress } from '@mui/material';
import { Link, useParams } from 'react-router';
import { useSingleWatchlist } from '../hooks/watchlists/useSingleWatchlist';
import Navbar from '../components/Navbar';
import Watchlist from '../components/WatchlistComponent';
import Searchbar from '../components/Searchbar';
import Footer from '../components/FooterComponent';
import test from '../assets/Cato-and company against death guard_ardvvr-artstation.jpg';
import BgImg from '../components/bgImgComponent';
import SideContent from '../components/sideContentComponent';
import apiConversion from '../util/apiDataConversion';
import RenderSingleWatchlist from '../components/render/renderSingleWatchlist';
import { useDeleteItemFromWatchlist } from '../hooks/watchlists/useDeleteItemFromWatchlist';
import { useReplaceWatchlistItem } from '../hooks/watchlists/useReplaceWatchlistItem';


export default function SingleWatchlistPage () {

    const { freeOrNah, storeName, dayConvert, monthConvertName, timeConvert, } = apiConversion();
    const theme = useTheme();
    const params = useParams();
	const watchlistId = params.watchlistId;
	const { watchlist, loading: watchlistLoading, error: watchlistError, setWatchlist, refetch } = useSingleWatchlist(watchlistId);
    const { execute: deleteExecute, loading: deleteLoading, error: deleteError } = useDeleteItemFromWatchlist();
    const { execute: executeReplace, isLoading: replaceIsLoading, error: replaceError } = useReplaceWatchlistItem();
    const statusOfWatchlist = { watchlistLoading, watchlistError };
    const statusOfDeleteCallback = { deleteLoading, deleteError };
    const statusOfReplaceCallback = { replaceIsLoading, replaceError };

    const handleDeleteItemFromWatchlist = async (gameID) => {
        if (!watchlist) return;
        const prevWatchlist = watchlist;
        const prevWatchlistItems = watchlist.items || [];

        const nextItems = prevWatchlistItems.filter((item) => item.gameID !== gameID);
        setWatchlist({ ...watchlist, items: nextItems });
        
        try {
            const updated = await deleteExecute(watchlist.id, gameID);
            setWatchlist(updated)

        } catch (err) {
            setWatchlist(prevWatchlist);
            console.error('Delete failed: ', err);
        }
    };

    const handleReplaceItem = async (gameID, candidate) => {
        if (!watchlist || !gameID || !candidate || Object.keys(candidate).length < 1) return null;

        try {
            await executeReplace(watchlist.id, gameID, candidate);
            await refetch();
        } catch (err) {
            console.error("Replace failed: ", err);
        }
    };
    
    return (
        <>
            <Container sx={{ paddingTop: 7, minHeight: '100vh', }}>
                <Navbar />
                <RenderSingleWatchlist watchlist={watchlist} watchlistStatus={statusOfWatchlist} deleteCallbackStatus={statusOfDeleteCallback} deleteCallback={handleDeleteItemFromWatchlist} replaceCallback={handleReplaceItem} replaceCallbackStatus={statusOfReplaceCallback} />
            </Container>
            <Footer />
        </>
    )
};