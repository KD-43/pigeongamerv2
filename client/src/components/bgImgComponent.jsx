import { useState, useRef } from 'react';
import apiConversion from '../util/apiDataConversion';
import { alpha, Box, Button, Grid, Paper, Typography, useTheme, IconButton, Menu, MenuItem, Slide } from '@mui/material';
import { OpenInNew, ExpandMore } from '@mui/icons-material';
import BrokenImageFallback from './util/brokenImageComponent';
import textureOverlay from "../assets/images/pexels-seamlesstextures-11236676_downSize.jpg";
import { DropdownButton } from './util/dropDownComponent';
import { useWatchlists } from '../hooks/watchlists/useWatchlists';
import { useCreateWatchlist } from '../hooks/watchlists/useCreateWatchlist';
import { CreateWatchlistDialog } from './util/dialogComponent';
import LoadingRender from './render/loadingRender';
import ErrorRender from './render/errorCodeRender';

export default function BgImg ({ payload, width, height = 500, py, alertFeedback }) {
    const theme = useTheme();
    console.log('payload', payload);
    const [ dialogOpen, setDialogOpen ] = useState(false);
    const [ submitting, setSubmitting ] = useState(false);
    const { dealId, gameInfo } = payload;
    const { storeID, gameID, name, salePrice, retailPrice, thumb, } = gameInfo;
    const { freeOrNah, storeName, discountPercentage } = apiConversion();
    const { watchlists, loading, error, setWatchlists, refetch } = useWatchlists();
    const { execute: executeCreateWatchlist, watchlist: updatedWatchlists, loading: createWatchlistLoading, error: createWatchlistError } = useCreateWatchlist();

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => {
        if (submitting) return;
        setDialogOpen(false);
    };

    const handleCreateWatchlist = async (name) => {
        if (!name) return null;
        try {
            setSubmitting(true);

            await executeCreateWatchlist(name);
            const updateList = await refetch();
            setWatchlists(updateList);
            alertFeedback('create', 'success');
        } catch (err) {
            console.error(err);
            alertFeedback('create', 'error');
        } finally {
            setSubmitting(false);
            setDialogOpen(false);
        }
    };

    return (
        <>
            <CreateWatchlistDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onSubmit={handleCreateWatchlist}
                submitting={submitting}
            />
            <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: '42px', width: width, height: height, position: 'relative', px: py * 2, py: py, }}>
                {thumb ? (
                    <Box
                        sx={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', zIndex: 0 }}
                    >
                        <Box
                            component="img"
                            src={thumb ? thumb : null}
                            alt={name}
                            aria-hidden
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                opacity: 0.5,
                                pointerEvents: 'none',
                                filter: 'blur(6px) grayscale(100%)',
                                transform: 'scale(1.02)',
                                mixBlendMode: 'soft-light',
                            }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `url(${textureOverlay})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'grayscale(1)',
                                mixBlendMode: 'multiply',
                                opacity: 0.75,
                                pointerEvents: 'none',
                            }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: theme.palette.primary.main,
                                mixBlendMode: 'overlay',
                                opacity: 0.8,
                            }}
                        />
                        
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                background:
                                    'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 80%)',
                                pointerEvents: 'none',
                                mixBlendMode: 'multiply',
                                opacity: 0.9,
                            }}
                        />
                    </Box>) :

                    <BrokenImageFallback />
                
                }

                <Box sx={{ flexGrow: 1, height: '100%', }}>

                    <Grid
                        direction='column'
                        container
                        spacing={1}
                        sx={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', }}
                    >
                        <Grid direction={'column'} size={6} sx={{ display: 'flex', width: '100%', flex: 1,}}>

                            <Box
                                sx={{
                                    color: theme.palette.background.default,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'end',
                                }}
                            >
                                <Typography variant={'body1'} sx={{ fontWeight: '900', fontSize: 'clamp(1rem, 2vw, 2rem)', lineHeight: '1.2' }}>
                                    {name}
                                </Typography>
                            </Box>

                        </Grid>

                        <Grid container size={6} sx={{ width: '100%', flex: 1, }}>

                            <Grid size={6} sx={{ display: 'flex', width: '100%', gap: 1, }}>
                                <Box sx={{ flexGrow: 0, placeItems: 'center', width: 'auto', height: 'fit-content', borderRadius: '40px', color: 'background.default', borderColor: theme.palette.background.default, border: '2px solid', pt: '6px', pb: '3px', px: '16px', margin: 0 }}>
                                    <Typography variant="body1" fontWeight={'bold'}>{storeName(storeID)}</Typography>
                                </Box>
                                <Box sx={{ flexGrow: 0, width: 'auto', height: 'fit-content', backgroundColor: theme.palette.background.default, border: `2px solid ${theme.palette.primary.main}`, borderRadius: '40px', pt: '6px', pb: '3px', px: '16px', margin: 0 }}>
                                    <Typography variant="body1" color={theme.palette.primary.main} fontWeight={'bold'}>{freeOrNah(salePrice)}</Typography>
                                </Box>
                                <Box sx={{ flexGrow: 0, width: 'auto', height: 'fit-content', backgroundColor: theme.palette.background.default, border: `2px solid ${theme.palette.secondary.main}`, borderRadius: '40px', pt: '6px', pb: '3px', px: '16px', margin: 0 }}>
                                    <Typography variant="body1" color={theme.palette.secondary.main} fontWeight={'bold'}>{discountPercentage(retailPrice, salePrice) + ' Discount'}</Typography>
                                </Box>
                            </Grid>
                            <Grid container size={6} sx={{ width: '100%' }}>
                                <Grid size={6} sx={{ alignContent: 'end'}}>
                                    <DropdownButton 
                                        items={watchlists}
                                        payload={payload}
                                        loading={loading}
                                        error={error}
                                        onCreateNew={handleOpenDialog}
                                        alertFeedback={alertFeedback}
                                    />
                                </Grid>
                                <Grid size={6} sx={{ alignContent: 'end' }}>
                                    <Button LinkComponent={"a"} href={`https://www.cheapshark.com/redirect?dealID=${dealId}`} target="_blank" rel="noopener noreferrer" fullWidth variant="contained" size="large" sx={{ display: 'flex',  justifyContent: 'center', alignItems: 'center', gap: 1,  }}>Go to deal <OpenInNew /></Button>
                                </Grid>
                            </Grid>

                        </Grid>

                    </Grid>
                    
                </Box>
            </Box>
        </>
    )
}