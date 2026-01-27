import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router'
import { Box, Container, Grid, Typography, useTheme, } from '@mui/material';
import Navbar from "../components/Navbar";
import List from "../components/List";
import Footer from '../components/FooterComponent';
import Searchbar from '../components/Searchbar';
import { useTrendingDeals } from '../hooks/deals/useTrendingDeals';
import { useRecentDeals } from '../hooks/deals/useRecentDeals';
import LoadingRender from '../components/render/loadingRender';
import ErrorRender from '../components/render/errorCodeRender';

export default function ViewMoreDeals () {

    const theme = useTheme();
    const { dealsType } = useParams();
    const navigate = useNavigate();
    const recent = useRecentDeals();
    const trending = useTrendingDeals();

    const active =
        dealsType === 'recent'
            ? {
                deals: recent.recentDeals,
                loading: recent.loading,
                error: recent.error,
            }
            : {
                deals: trending.trendingDeals,
                loading: trending.loading,
                error: trending.error,
            };

    const { deals, loading, error } = active;

    console.log(`deals for ${dealsType}: `, deals);
    console.log(`error for ${dealsType}: `, error);

    return (
        <>
            <Container sx={{ paddingTop: 7, minHeight: '100vh', }}>
                <Navbar />
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', flexGrow: 1, justifyContent: 'space-between', }}>
                    <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center', mt: 4, }}>
                        <Grid container spacing={1} size={8} sx={{ color: 'secondary.main', }}>
                            
                            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', }}>
                                <Typography variant={'h5'} fontWeight={'900'}>Viewing more:</Typography>
                                <Typography variant={'h5'} fontWeight={'900'} sx={{ ml: 2 }}>"{dealsType ? dealsType[0].toUpperCase() + dealsType.slice(1) : ''}"</Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ backgroundColor: theme.palette.tertiary.main, borderRadius: 40, height: 48, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 3, py: 2, mt: 5, }}>
                            <Grid container spacing={1} sx={{ justifyContent: 'space-between'}}>
                                <Grid size={2} sx={{ display: 'grid', placeItems: 'start'}}><Typography variant="body1" fontWeight={'900'}>TITLE</Typography></Grid>
                                <Grid size={7} sx={{ display: 'grid', placeItems: 'center'}}><Typography variant="body1" fontWeight={'900'}>STORE</Typography></Grid>
                                <Grid size={2} sx={{ display: 'grid', placeItems: 'center'}}><Typography variant="body1" fontWeight={'900'}>PRICE | DISCOUNT</Typography></Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <List
                        items={deals ? deals : []}
                        onItemClick={(i) => navigate(`/deals/details/${deals[i].dealID}`)}
                        itemsError={error}
                        itemsLoading={loading}
                        version={'standard'}
                        sx={{ my: 56, }}
                    />
                    {!error && <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center'}}>
                        <Grid sx={{}}>
                            <Typography variant={'h5'} color={theme.palette.tertiary.main} fontWeight={'bold'}>End of results</Typography>
                        </Grid>
                    </Grid>}

                    <Grid container spacing={8} sx={{ my: 20, display: 'flex', }}>
                        <Grid size={6}>
                            <Typography variant="h3" fontWeight={'900'} color={'primary'} textAlign={'end'}>
                                Have a title in mind? <br /> Look for it!
                            </Typography>
                        </Grid>
                        <Grid size={6} sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Box sx={{ width: '100%', }}>
                                <Searchbar bgColor={theme.palette.tertiary.main} width={'100%'}/>
                            </Box>
                        </Grid>
                    </Grid>

                </Box>
            </Container>
            <Footer />
        </>
    )
};