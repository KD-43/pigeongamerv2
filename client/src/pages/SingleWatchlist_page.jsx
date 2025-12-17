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


export default function SingleWatchlistPage () {

    const { freeOrNah, storeName, dayConvert, monthConvertName, timeConvert, } = apiConversion();
    const theme = useTheme();
    const params = useParams();
	const watchlistId = params.watchlistId;
	const { watchlist, loading: watchlistLoading, error: watchlistError, setWatchlist } = useSingleWatchlist(watchlistId);
    const { execute: deleteExecute, loading: deleteLoading, error: deleteError } = useDeleteItemFromWatchlist();
    const statusOfWatchlist = { watchlistLoading, watchlistError };
    const statusOfDeleteCallback = { deleteLoading, deleteError };

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
    }
    
    return (
        <>
            <Container sx={{ paddingTop: 7, minHeight: '100vh', }}>
                <Navbar />
                <RenderSingleWatchlist watchlist={watchlist} watchlistStatus={statusOfWatchlist} deleteCallbackStatus={statusOfDeleteCallback} deleteCallback={handleDeleteItemFromWatchlist} />
            </Container>
            <Footer />
        </>
    )
};