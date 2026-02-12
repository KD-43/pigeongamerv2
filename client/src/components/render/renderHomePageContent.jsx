import { Bed, Error } from '@mui/icons-material';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import RenderHeroContent from './renderHeroContent';
import ListCardStack from '../ListCard';

export default function RenderHomepageContent ({ payload }) {
    const theme = useTheme();
    const { hero, trending, recent, warmup } = payload;
    const { heroDealsArr, heroLoading, heroError } = hero;
    const { trendingDeals, trendingLoading, trendingError } = trending;
    const { recentDeals, recentLoading, recentError } = recent;
    const { isWaking, wakeFailed } = warmup;
    
    if (isWaking) return (
        <Box sx={{ maxHeight: '585.23px' }}>
            <Bed sx={{ width: '150px', height: 'auto', fill: theme.palette.primary.main, }} />
            <Typography fontSize={50} fontWeight={900}>
                Waking up...
            </Typography>
        </Box>
    );
    
    if (wakeFailed) return (
        <Box sx={{ maxHeight: '585.23px' }}>
            <Error sx={{ width: '150px', height: 'auto', fill: theme.palette.secondary.main, }} />
            <Typography fontSize={50} fontWeight={900}>
                Waking up...
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
        </>
    )
}