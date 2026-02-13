import { Bed, Error } from '@mui/icons-material';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import RenderHeroContent from './renderHeroContent';
import ListCardStack from '../ListCard';
import SpecialFeature from '../specialFeatureComponent';
import Searchbar from '../Searchbar';

export default function RenderHomepageContent ({ payload }) {
    const theme = useTheme();
    const { hero, trending, recent, warmup } = payload;
    const { heroDealsArr, heroLoading, heroError } = hero;
    const { trendingDeals, trendingLoading, trendingError } = trending;
    const { recentDeals, recentLoading, recentError } = recent;
    const { isWaking, wakeFailed } = warmup;
    
    if (isWaking) return (
        <Box sx={{ pb: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',}}>
            <Bed sx={{ width: '200px', height: 'auto', fill: theme.palette.primary.main, }} />
            <Typography fontSize={25} fontWeight={900} textAlign={'center'} color={theme.palette.black.default} sx={{ maxWidth: '600px'}}>
                Waking up...
            </Typography>
        </Box>
    );
    
    if (wakeFailed) return (
        <Box sx={{ pb: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',}}>
            <Error sx={{ width: '150px', height: 'auto', fill: theme.palette.secondary.main, }} />
            <Typography fontSize={25} fontWeight={900} textAlign={'center'} color={theme.palette.secondary.main} sx={{ maxWidth: '600px' }}>
                An Error occurred when launching. Please try again later.
            </Typography>
        </Box>
    );

    return (
        <>
            <RenderHeroContent dealsArr={heroDealsArr} interval={10000} loading={heroLoading} error={heroError} />
            <Grid container spacing={3} sx={{  py: '56px' }}>
                <Grid size={6} sx={{ maxHeight: '585.23px' }}>
                    <ListCardStack
                        title="Trending Deals"
                        items={trendingDeals}
                        actionLabel="View More"
                        onAction={() => navigate(`/deals/view-more/trending`)}
                        onItemClick={(i) => navigate(`/deals/details/${trendingDeals[i].dealID}`)}
                        itemsLoading={trendingLoading}
                        itemsError={trendingError}
                    />
                </Grid>
                <Grid size={6} sx={{ maxHeight: '585.23px' }}>
                    <ListCardStack
                        title="New Deals"
                        items={recentDeals}
                        actionLabel="View More"
                        onAction={() => navigate(`/deals/view-more/recent`)}
                        onItemClick={(i) => navigate(`/deals/details/${recentDeals[i].dealID}`)}
                        itemsLoading={recentLoading}
                        itemsError={recentError}
                    />
                </Grid>
            </Grid>
            <SpecialFeature />
            <Grid container spacing={8} justifyContent={'space-between'} sx={{ my: '160px', }}>
                <Grid size={6}>
                    <Typography variant="h3" fontWeight={'900'} color={'primary'} textAlign={'end'}>
                        Have a title in mind? <br /> Look for it!
                    </Typography>
                </Grid>
                <Grid size={6} display={'flex'} alignItems={'center'}>
                    <Searchbar bgColor={theme.palette.tertiary.main} width={'100%'}/>
                </Grid>
            </Grid>
        </>
    )
}