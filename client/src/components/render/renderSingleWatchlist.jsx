import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Watchlist from "../WatchlistComponent";
import { Typography, CircularProgress, Box, Grid, useTheme, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import ErrorRender from "./errorCodeRender";
import SimpleModal from "../util/simpleTemplateModalComponent";
import TextField from '@mui/material/TextField';

export default function RenderSingleWatchlist ({ watchlist, watchlistStatus, deleteCallbackStatus, deleteCallback, replaceCallback, replaceCallbackStatus, renameCallback, renameCallbackStatus}) {
    const theme = useTheme();
    const navigate = useNavigate();
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ renameValue, setRenameValue ] = useState('');
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const { watchlistLoading, watchlistError } = watchlistStatus;
    const { replaceIsLoading, replaceError } = replaceCallbackStatus;
    const { renameIsLoading, renameError } = renameCallbackStatus;

    const MAX_LEN = 40;

    const isTooLong = renameValue.length > MAX_LEN;
    const isEmpty = renameValue.trim().length === 0;

    const disableSubmit = isSubmitting || isTooLong || isEmpty;

    console.log("renameValue: ", renameValue);
    const handleModalOpen = () => {
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const RenderTextField = () => {
        return (
            <TextField
                autoFocus
                margin="dense"
                fullWidth
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                label={"New Name"}
            />
        )
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (disableSubmit) return;

        try {
            setIsSubmitting(true);
            await renameCallback(renameValue);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
            setIsModalOpen(false);
        }
    };


    if (watchlistError || replaceError || renameError) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '75vh' }}>
                <ErrorRender code={"Unknown Error"} />
            </Box>
        )
    };
    
    if (watchlistLoading || replaceIsLoading || renameIsLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '75vh' }}>
                <CircularProgress size={56} />
            </Box>
        )
    };

    return (
        <>
            <SimpleModal 
                isOpen={isModalOpen} 
                onClose={handleModalClose}
                content={{ title: 'Rename Watchlist', body: 'Max length is 40 characters', abort: 'CANCEL', cta: 'RENAME' }}
                onSubmit={handleSubmit}
                formId={'rename-watchlist-form'}
                children={<RenderTextField />}
                disableSubmit={disableSubmit}
            />
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'start', alignItems: 'baseline', mt: 6, minWidth: 0 }}>
                <Typography variant='h2' fontWeight={'900'} sx={{ minWidth: 0, color: 'black', whiteSpace: 'normal', overflowWrap: 'break-word'}}>{watchlist.name}</Typography>
                <IconButton onClick={handleModalOpen} color="primary" sx={{ backgroundColor: 'tertiary.main', }}>
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