import { useEffect, useState } from 'react';
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
import SimpleModal from '../components/util/simpleTemplateModalComponent';


export default function SingleWatchlistPage () {

    const { freeOrNah, storeName, dayConvert, monthConvertName, timeConvert, } = apiConversion();
    const theme = useTheme();
    const params = useParams();
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isDeleting, setIsDeleting ] = useState(false);
    const [ gameIDToDelete, setGameIDToDelete ] = useState('');
	const watchlistId = params.watchlistId;
	const { watchlist, loading: watchlistLoading, error: watchlistError, setWatchlist, refetch } = useSingleWatchlist(watchlistId);
    const { execute: executeDeleteItem, loading: deleteLoading, error: deleteError } = useDeleteItemFromWatchlist();
    const { execute: executeReplace, isLoading: replaceIsLoading, error: replaceError } = useReplaceWatchlistItem();
    const { execute: executeRename, isLoading: renameIsLoading, error: renameError } = useUpdateWatchlistName();
    const statusOfWatchlist = { watchlistLoading, watchlistError };
    const statusOfDeleteCallback = { deleteLoading, deleteError };
    const statusOfReplaceCallback = { replaceIsLoading, replaceError };
    const statusOfRenameCallback = { renameIsLoading, renameError };

    const handleDeleteItemFromWatchlist = async (gameID) => {
        if (!watchlist) return;
        if (gameID < 0) return;

        console.log('[ handleDeleteItem ] - gameID: ', gameID);

        setIsDeleting(true);
        
        try {
            setWatchlist(prev => {
                const newArr = prev.items.filter(i => i.gameID !== gameID);
                return { ...prev, items: newArr };
            });
            await executeDeleteItem(watchlist.id, gameID);
            // await refetch();

        } catch (err) {
            console.error('Delete failed: ', err);
        } finally {
            setIsModalOpen(false);
            setIsDeleting(false);
            setGameIDToDelete('');
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

    const handleOpenModal = (index) => {
        if (isDeleting) return null;
        if (!watchlist) return null;
        setIsModalOpen(true);
        setGameIDToDelete(watchlist.items[index].gameID);
        // console.log('[ MODAL OPEN ] - index', index)
        // console.log(`Modal made it! Object at index ${index}: `, watchlist.items[index]);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsDeleting(false);
        setGameIDToDelete('');
    };
    
    return (
        <>
            <Container sx={{ paddingTop: 7, paddingBottom: 20, minHeight: '100vh', }}>
                <Navbar />
                <SimpleModal 
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    content = {{ title: 'Delete Title from Watchlist?', body: 'Doing so is irreversible.', abort: 'Cancel', cta: 'DELETE' }}
                    onSubmit={() => handleDeleteItemFromWatchlist(gameIDToDelete)}
                    formId = 'simple-modal-form'
                    // children={}
                    disableSubmit={isDeleting}
                />
                <RenderSingleWatchlist 
                    watchlist={watchlist} 
                    watchlistStatus={statusOfWatchlist}
                    deleteCallback={handleOpenModal}
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