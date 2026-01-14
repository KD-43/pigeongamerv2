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
import { useUpdateWatchlistName } from '../hooks/watchlists/useUpdateWatchlistName';


export default function SingleWatchlistPage () {

    const { freeOrNah, storeName, dayConvert, monthConvertName, timeConvert, } = apiConversion();
    const theme = useTheme();
    const params = useParams();
	const watchlistId = params.watchlistId;
	const { watchlist, loading: watchlistLoading, error: watchlistError, setWatchlist, refetch } = useSingleWatchlist(watchlistId);
    const { execute: executeDeleteItem, loading: deleteLoading, error: deleteError } = useDeleteItemFromWatchlist();
    const { execute: executeReplace, isLoading: replaceIsLoading, error: replaceError } = useReplaceWatchlistItem();
    const { execute: executeRename, isLoading: renameIsLoading, error: renameError } = useUpdateWatchlistName();
    const statusOfWatchlist = { watchlistLoading, watchlistError };
    const statusOfDeleteCallback = { deleteLoading, deleteError };
    const statusOfReplaceCallback = { replaceIsLoading, replaceError };
    const statusOfRenameCallback = { renameIsLoading, renameError };

    useEffect(() => {
        console.log('SingleWatchlistPage mounted');
        return () => console.log('SingleWatchlistPage unmounted');
    }, []);

    const handleDeleteItemFromWatchlist = async (gameID) => {
        if (!watchlist) return;
        if (!gameID) return;
        
        try {
            setWatchlist(prev => {
                const newArr = prev.items.filter(i => i.gameID !== gameID);
                return { ...prev, items: newArr };
            });
            await executeDeleteItem(watchlist.id, gameID);
            // await refetch();

        } catch (err) {
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

    const handleRenameWatchlist = async (name) => {
        if (!watchlist || !watchlist.id) return null;
        console.log("handleRenameWatchlist", name);

        try {
            await executeRename(watchlist.id, name);
            await refetch();
        } catch (err) {
            console.error("Rename failed: ", err);
        }
    };
    
    return (
        <>
            <Container sx={{ paddingTop: 7, paddingBottom: 20, minHeight: '100vh', }}>
                <Navbar />
                <RenderSingleWatchlist 
                    watchlist={watchlist} 
                    watchlistStatus={statusOfWatchlist}
                    deleteCallback={handleDeleteItemFromWatchlist} 
                    deleteCallbackStatus={statusOfDeleteCallback}
                    replaceCallback={handleReplaceItem} 
                    replaceCallbackStatus={statusOfReplaceCallback}
                    renameCallback={handleRenameWatchlist}
                    renameCallbackStatus={statusOfRenameCallback}
                />
            </Container>
            <Footer />
        </>
    )
};