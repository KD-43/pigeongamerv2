import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import apiConversion from '../util/apiDataConversion';
import { alpha, Box, Button, Grid, Paper, Typography, useTheme, IconButton, LinearProgress } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight, OpenInNew, InfoOutline, BrokenImage  } from '@mui/icons-material';
import textureOverlay from "../assets/images/pexels-seamlesstextures-11236676_downSize.jpg";
import BrokenImageFallback from './util/brokenImageComponent';


export default function HeroBase ({ deals = [], loading = false, error = null, intervalMs = 10000 }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const [ index, setIndex ] = useState(0);
    const { freeOrNah, storeName } = apiConversion();

    const intervalRef = useRef(null);
    const startInterval = () => {
        intervalRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % deals.length);
        }, intervalMs);
    };
    const resetInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        startInterval();
    };

    useEffect(() => {
        if (!deals.length) return;

        startInterval();

        return () => clearInterval(intervalRef.current);
    }, [deals.length, intervalMs]);

    if (!deals.length) return null;

    const current = deals[index];

    const {
        dealID,
        title,
        storeID,
        salePrice,
        savings,
        thumb,
    } = current;

    const handlePrev = () => {
        resetInterval();
        setIndex((prev) => (prev === 0 ? deals.length - 1 : prev - 1))
    };

    const handleNext = () => {
        resetInterval();
        setIndex((prev) => (prev + 1) % deals.length);
    };

    return (
        <>
            <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: '42px', marginTop: '56px', height: '514px', position: 'relative', overflow: 'hidden', py: {xs: 6, lg: 8}, }}>
                {thumb ? (
                    <>
                        <Box
                            component="img"
                            src={thumb ? thumb : null}
                            alt={title}
                            aria-hidden
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                opacity: 0.75,
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
                                opacity: 0.65,
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
                    </>) :
                    <BrokenImageFallback />
                
                }
                <Box sx={{ flexGrow: 1, height: '100%', }}>
                    <Grid
                        container
                        spacing={1}
                        sx={{ position: 'relative', zIndex: 1, justifyContent: 'space-between', height: '100%', }}
                    >
                        <Grid size={1} sx={{ alignContent: 'center', justifyContent: 'center', paddingLeft: '8px', width: 'auto'}}>
                            <IconButton onClick={handlePrev} aria-label="Swipe right" size="large" sx={{ color: theme.palette.background.default, '&:hover': { backgroundColor: (theme) => alpha(theme.palette.background.default, 0.2) }}}>
                                <KeyboardArrowLeft />
                            </IconButton>
                        </Grid>
                        <Grid container direction={'column'} size={10} sx={{
                            gap: 1,
                            position: 'relative',
                            zIndex: 10,
                            color: theme.palette.background.default,
                            height: '100%',
                        }}>
                            <Grid container size={6} sx={{ width: '100%', flexGrow: 1, alignItems: 'end', flex: '0 0 50%', minHeight: 0, }}>
                                <Typography sx={{ fontWeight: '900', fontSize: 'clamp(2rem, 3vw, 3rem)', lineHeight: '1.2', maxWidth: '75%', width: 'fit-content', }}>
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid container size={6} spacing={1} sx={{ width: '100%', flexGrow: 1, }}>
                                <Grid container spacing={1} py={'16px'} sx={{ flexGrow: 1, }}>
                                    <Grid container size={6} spacing={1} sx={{}}>
                                        <Grid size={4} sx={{ }}>
                                            <Box sx={{ flexGrow: 0, display: "grid", height: 'min(100%, 37px)', placeItems: 'center', width: 'auto', borderRadius: '40px', borderColor: theme.palette.background.default, border: '2px solid', pt: '6px', pb: '3px', px: '16px', margin: 0 }}>
                                                <Typography variant="body1" fontWeight={'bold'} fontSize={'clamp(0.5rem, 0.5vw, 1rem)'}>{storeName(storeID)}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid size={4} sx={{  }}>
                                            <Box sx={{ flexGrow: 0, height: 'min(100%, 37px)', display: 'grid', placeItems: 'center', width: 'auto', backgroundColor: theme.palette.background.default, border: `2px solid ${theme.palette.primary.main}`, borderRadius: '40px', pt: '6px', pb: '3px', px: '16px', margin: 0 }}>
                                                <Typography variant="body1" color={theme.palette.primary.main} fontWeight={'bold'} fontSize={'clamp(0.5rem, 0.5vw, 1rem)'}>{freeOrNah(salePrice)}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid size={4} sx={{  }}>
                                            <Box sx={{ flexGrow: 0, height: 'min(100%, 37px)', display: 'grid', placeItems: 'center', width: 'auto', backgroundColor: theme.palette.background.default, border: `2px solid ${theme.palette.secondary.main}`, borderRadius: '40px', pt: '6px', pb: '3px', px: '16px', margin: 0 }}>
                                                <Typography variant="body1" color={theme.palette.secondary.main} fontWeight={'bold'} fontSize={'clamp(0.5rem, 0.5vw, 1rem)'}>{`${Math.floor(savings)}% Discount!`}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container size={6} sx={{ alignItems: 'end', }}>
                                        <Grid size={6} sx={{ }}>
                                            <Button onClick={() => navigate(`/deals/details/${dealID}`)} fullWidth variant="black" size="large" sx={{ position: 'relative', zIndex: 10, display: 'flex', gap: 1, }}>Go to page <InfoOutline /></Button>
                                        </Grid>
                                        <Grid size={6} sx={{ }}>
                                            <Button LinkComponent={"a"} href={`https://www.cheapshark.com/redirect?dealID=${dealID}`} target="_blank" rel="noopener noreferrer" fullWidth variant="contained" size="large" sx={{ position: 'relative', zIndex: 10, display: 'flex', gap: 1, }}>Go to deal <OpenInNew /></Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                
                        </Grid>
                        <Grid size={1} sx={{ alignContent: 'center', justifyContent: 'center', paddingRight: '8px', width: 'auto'}}>
                            <IconButton onClick={handleNext} aria-label="Swipe right" size="large" sx={{ color: theme.palette.background.default, '&:hover': { backgroundColor: (theme) => alpha(theme.palette.background.default, 0.2) }}}>
                                <KeyboardArrowRight />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
                
            </Box>
        </>
    )
}