import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router'
import { Box, Container, Grid, Typography, useTheme, CircularProgress } from '@mui/material';
import Navbar from "../components/Navbar";
import List from "../components/List";
import Footer from '../components/FooterComponent';
import Searchbar from '../components/Searchbar';
import { useSearchForDeals } from '../hooks/deals/useSearchForDeals';
import RenderSearchResults from '../components/render/renderSearchResults';

export default function SearchResults () {

    const theme = useTheme();
    const { query: encodedQuery } = useParams();
    const navigate = useNavigate();
    const query = encodedQuery ? decodeURIComponent(encodedQuery) : '';
    const { execute, queryDeals, loading, error } = useSearchForDeals();

    useEffect(() => {
        if (!query) return;
        execute(query);
    }, [query, execute]);

    console.log('queryDeals', queryDeals);
    if (loading) {
        <>
            <Container sx={{ paddingTop: 7, minHeight: '100vh', }}>
                <Navbar />
                <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center', mt: 4, }}>
                    <Grid size={6} sx={{ justifyItems: 'end', }}>
                        <Typography variant={'h6'} fontWeight={'900'}>Results for:</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant={'h6'} fontWeight={'900'}>{query.toString().trim()}</Typography>
                    </Grid>
                </Grid>
                

                <Grid container spacing={8} justifyContent={'space-between'} sx={{ my: 20, }}>
                    <Grid size={6}>
                        <Typography variant="h3" fontWeight={'700'} color={'primary'} textAlign={'end'}>
                            Have a title in mind? <br /> Look for it!
                        </Typography>
                    </Grid>
                    <Grid size={6} display={'flex'} alignItems={'center'}>
                        <Searchbar bgColor={theme.palette.tertiary.main} width={'100%'}/>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    }

    return (
        <>
            <Container sx={{ paddingTop: 7, minHeight: '100vh', }}>
                <Navbar />
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', flexGrow: 1, justifyContent: 'space-between', }}>
                    <Grid container sx={{ alignItems: 'center', justifyContent: 'center', mt: 4, }}>
                        <Grid container spacing={1} size={8} sx={{ backgroundColor: 'primary.main', color: 'tertiary.main', borderRadius: 20, }}>
                            
                            <Grid size={12} sx={{ display: 'flex', justifyContent: 'start', pl: 3, py: 1, }}>
                                <Typography variant={'h6'} fontWeight={'900'}>Results for:</Typography>
                                <Typography variant={'h6'} fontWeight={'900'} sx={{ ml: 2 }}>"{query.toString().trim()}"</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Box sx={{ backgroundColor: theme.palette.tertiary.main, borderRadius: 40, height: 48, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 3, py: 2, mt: 5, }}>
                    <Grid container spacing={1} sx={{ justifyContent: 'space-between'}}>
                            <Grid size={2} sx={{ display: 'grid', placeItems: 'start'}}><Typography variant="body1" fontWeight={'900'}>TITLE</Typography></Grid>
                            <Grid size={7} sx={{ display: 'grid', placeItems: 'center'}}><Typography variant="body1" fontWeight={'900'}>STORE</Typography></Grid>
                            <Grid size={2} sx={{ display: 'grid', placeItems: 'center'}}><Typography variant="body1" fontWeight={'900'}>PRICE | DISCOUNT</Typography></Grid>
                        </Grid>
                    </Box>

                    <RenderSearchResults results={queryDeals ? queryDeals.results : []} loading={loading} error={error} />

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