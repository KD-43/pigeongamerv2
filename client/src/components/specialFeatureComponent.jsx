import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Grid, useTheme, Typography } from '@mui/material';
import listDisplay from '../assets/list_display.png';
import notificationDisplay from '../assets/notification_display.png';
import { ShoppingBag, TrendingFlat, AutoAwesome } from '@mui/icons-material';
import { CreateWatchlistDialog } from './util/dialogComponent';
import { useCreateWatchlist } from '../hooks/watchlists/useCreateWatchlist';

export default function SpecialFeature () {
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
        <Box sx={{ borderColor: theme.palette.primary.main, border: `4px solid ${theme.palette.primary.main}`, borderRadius: '42px', minHeight: '514px', overflow: 'hidden', py: { xs: 6, md: 10 } }}>
            <Grid container justifyContent={'center'} direction={'column'} alignItems={'center'}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, }}>
                    <Typography variant='h3' fontWeight={'900'} textAlign={'center'}
                        sx={{
                            '& span.primary': {
                                color: 'primary.main'
                            }
                        }}
                    >
                        <span className='primary'>Can't find a deal? <br /> Create a</span> Watchlist!
                    </Typography>
                    <Typography variant='body1'>
                        Keep track of the titles you want, to get them at the prices you want.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, width: '75%', py: 10}}>
                    <img src={listDisplay} width={150} height={'auto'} />
                    <TrendingFlat sx={{ width: 'auto', height: '100px', fill: 'black', }} />
                    <img src={notificationDisplay} width={150} height={'auto'} />
                    <TrendingFlat sx={{ width: 'auto', height: '100px', fill: 'black', }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <ShoppingBag sx={{ width: '150px', height: 'auto', fill: theme.palette.primary.main, position: 'relative', zIndex: '100', }} />
                        <AutoAwesome sx={{ position: 'absolute', zIndex: '101', marginTop: '40px', width: '40px', height: 'auto', fill: theme.palette.background.default }} />
                    </Box>
                </Box>

                <Button onClick={handleOpenDialog} variant='contained' size='large'>
                    Create one
                </Button>
            </Grid>
            <CreateWatchlistDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onSubmit={handleCreateWatchlist}
                submitting={submitting}
            />
        </Box>
    )
}