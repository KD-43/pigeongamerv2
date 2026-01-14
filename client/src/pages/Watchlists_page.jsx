import React, { useEffect, useState, useCallback } from 'react';
import { useCreateWatchlist } from '../hooks/watchlists/useCreateWatchlist';
import { Link, useNavigate } from 'react-router'
import { Box, Button, Container, Grid, Typography, useTheme, CircularProgress } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import Navbar from "../components/Navbar";
import List from "../components/List";
import Footer from '../components/FooterComponent';
import Searchbar from '../components/Searchbar';
import RenderWatchlists from '../components/render/renderWatchlists';
import { CreateWatchlistDialog } from '../components/util/dialogComponent';

export default function Watchlists () {

    const theme = useTheme();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [ isWatchlistCount, setIsWatchlistCount ] = useState(0);
    const navigate = useNavigate();
    const { execute, watchlist, loading, error } = useCreateWatchlist();

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => {
        if (submitting) return;
        setDialogOpen(false);
    };

    const watchlistCount = useCallback((count) => {
        if (!count) setIsWatchlistCount(0);
        setIsWatchlistCount(count);
    }, []);

    const handleCreateWatchlist = async (name) => {
        try {
            setSubmitting(true);

            const newList = await execute(name);
            const id = newList.id || newList._id;

            setDialogOpen(false);

            navigate(`/watchlists/${id}`);
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const maxLists = {
        backgroundColor: 'secondary.main', color: 'tertiary.main'
    }

    const lowLists = {
        backgroundColor: 'primary.main', color: 'tertiary.main'
    }

    return (
        <>
            <Container sx={{ paddingTop: 7, minHeight: '100vh', }}>
                <Navbar />
                <Grid container spacing={1} sx={{ justifyContent: 'start', alignItems: 'center', mt: 7, }}>
                    <Box sx={{ display: 'inline-flex', justifyItems: 'start', }}>
                        <Typography variant={'h2'} color={'black'} fontWeight={'900'}>Your Watchlists</Typography>
                    </Box>
                </Grid>

                <Box container sx={{ mt: 2, mb: 5, display: 'flex', justifyContent: 'start', gap: 3, }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2, py: 1,  ...(isWatchlistCount >= 10 ? maxLists : lowLists), borderRadius: 8, }}>
                            <Typography variant="body1" fontWeight={'900'}>
                                You have <span style={{ color: isWatchlistCount >= 10 ? null : theme.palette.black.default }}>{isWatchlistCount}/10</span> { isWatchlistCount ? isWatchlistCount > 1 ? 'Watchlists' : 'Watchlist' : 'Watchlists'  }
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ marginLeft: 1, }}>
                        <Button disabled={isWatchlistCount >= 10 ? true : false} onClick={handleOpenDialog} variant={'contained'} size="large" sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, }}>Create One <AddCircleOutline /></Button>
                    </Box>
                    
                </Box>
                <Box sx={{ backgroundColor: theme.palette.tertiary.main, color: 'primary.main', borderRadius: 40, height: 48, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 3, py: 2,  }}>
                    <Grid container spacing={3} sx={{}}>
                        <Grid size={4} sx={{ display: 'grid', placeItems: 'start'}}><Typography variant="body2" fontWeight={'900'}>LIST NAME</Typography></Grid>
                        <Grid size={2} sx={{ display: 'grid', placeItems: 'center'}}><Typography variant="body2" fontWeight={'900'}>CREATED/UPDATED</Typography></Grid>
                        <Grid size={2} sx={{ display: 'grid', placeItems: 'center'}}><Typography variant="body2" fontWeight={'900'}>ITEMS</Typography></Grid>
                        <Grid size={2} sx={{ display: 'grid', placeItems: 'center'}}><Typography variant="body2" fontWeight={'900'}>CHANGES</Typography></Grid>
                        <Grid size={2} sx={{ display: 'grid', placeItems: 'center'}}><Typography variant="body2" fontWeight={'900'}>DELETE</Typography></Grid>
                    </Grid>
                </Box>

                <CreateWatchlistDialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleCreateWatchlist}
                    submitting={submitting}
                />
                <RenderWatchlists count={watchlistCount} />

            </Container>
            <Footer />
        </>
    )
};