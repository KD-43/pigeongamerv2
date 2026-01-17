import { useNavigate } from 'react-router';
import { useWatchlists } from '../../hooks/watchlists/useWatchlists';
import { useDeleteWatchlist } from '../../hooks/watchlists/useDeleteWatchlist';
import { Box, Typography, CircularProgress, } from '@mui/material';
import { useEffect, useState, } from 'react';
import List from "../List";
import SimpleModal from '../util/simpleTemplateModalComponent';
import BottomCenterAlert from './renderAlertFeedback';

export default function RenderWatchlists ({ count, deleteStatus, deleteAlert }) {
    const { watchlists, loading, error, setWatchlists, refetch } = useWatchlists();
    const { execute: deleteExecute, targetWatchlistId, setTargetWatchlistId, loading: deleteLoading, error: deleteError } = useDeleteWatchlist();
    const navigate = useNavigate();
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isDeleting, setIsDeleting ] = useState(false);
    const [ didDelete, setDidDelete ] = useState(false);
    console.log('Watchlists: ', watchlists);

    useEffect(() => {
        if (!watchlists || !count) return null;
        count(watchlists.length);
    }, [watchlists])

    useEffect(() => {
        if (didDelete === undefined || didDelete === null) return null;
        deleteStatus(didDelete);
    }, [ didDelete ]);

    const handleDeleteWatchlist = async () => {
        console.log("[HANDLE DELETE WATCHLIST]: targetWatchlistId -", targetWatchlistId);
        if (targetWatchlistId === undefined || targetWatchlistId === null) return null;
        if (!watchlists) return null;

        setIsDeleting(true);

        setWatchlists(prev => {
            if (!prev) return null;

            console.log('isArray?', Array.isArray(watchlists), watchlists);
            const newList = watchlists.filter(i => i.id !== targetWatchlistId);
            return newList;
        });

        try {
            await deleteExecute(targetWatchlistId);
            setDidDelete(true);
        } catch (err) {
            setDidDelete(false);
            refetch();
        } finally {
            setIsModalOpen(false);
            setIsDeleting(false);
            deleteAlert();
        }
    }

    const handleOpenModal = (index) => {
        if (isDeleting) return null;
        if (!watchlists) return null;
        setIsModalOpen(true);
        setTargetWatchlistId(watchlists[index].id)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsDeleting(false);
    };

    if (error) {
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
            <SimpleModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                content = {{ title: 'Delete Watchlist?', body: 'Doing so is irreversible.', abort: 'Cancel', cta: 'DELETE' }}
                onSubmit={() => handleDeleteWatchlist()}
                formId = 'simple-modal-form'
                // children={}
                disableSubmit={isDeleting}
            />
            <List
                items={watchlists}
                actionLabel="View More"
                onAction={(i) => handleOpenModal(i)}
                onItemClick={(i) => navigate(`/watchlists/${watchlists[i].id}`)}
                version={'tertiary'}
                sx={{ my: 56, }}
            />
        </>
    );
}