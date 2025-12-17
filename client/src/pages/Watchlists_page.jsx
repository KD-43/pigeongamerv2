import React, { useEffect, useState } from 'react';
import { useCreateWatchlist } from '../hooks/watchlists/useCreateWatchlist';
import { Link, useNavigate } from 'react-router'
import { Box, Button, Container, Grid, Typography, useTheme, CircularProgress } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import Navbar from "../components/Navbar";
import List from "../components/List";
import Footer from '../components/FooterComponent';
import Searchbar from '../components/Searchbar';
import renderWatchlists from '../components/render/renderWatchlists';
import { CreateWatchlistDialog } from '../components/util/dialogComponent';

export default function Watchlists () {

    const theme = useTheme();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { execute, watchlist, loading, error } = useCreateWatchlist();

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => {
        if (submitting) return;
        setDialogOpen(false);
    };

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

    return (
        <>
            <Container sx={{ paddingTop: 7, minHeight: '100vh', }}>
                <Navbar />
                <Grid container spacing={1} sx={{ justifyContent: 'start', alignItems: 'center', mt: 7, }}>
                    <Box sx={{ display: 'inline-flex', justifyItems: 'start', }}>
                        <Typography variant={'h3'} color={'primary.main'} fontWeight={'bold'}>Your Watchlists</Typography>
                    </Box>
                    <Box sx={{ marginLeft: 1, }}>
                        <Button onClick={handleOpenDialog} variant={'contained'} size="large" sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, }}>Create One <AddCircleOutline /></Button>
                    </Box>
                </Grid>

                <CreateWatchlistDialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleCreateWatchlist}
                    submitting={submitting}
                />
                {renderWatchlists()}

            </Container>
            <Footer />
        </>
    )
};