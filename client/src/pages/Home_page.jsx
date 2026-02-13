import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import HeroBase from "../components/HeroComponent";
import { useHeroDeals } from "../hooks/deals/useHeroDeals.js";
import { useRecentDeals } from "../hooks/deals/useRecentDeals.js";
import { useTrendingDeals } from "../hooks/deals/useTrendingDeals.js";
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import ListCardStack from "../components/ListCard";
import SpecialFeature from "../components/specialFeatureComponent";
import Searchbar from "../components/Searchbar";
import Footer from "../components/FooterComponent";
import HeroLoading from "../components/util/heroLoadingComponent.jsx";
import RenderHeroContent from "../components/render/renderHeroContent.jsx";
import { useAppWarmup } from "../hooks/appWarmup.js";
import RenderHomepageContent from "../components/render/renderHomePageContent.jsx";

export default function HomePage () {
    const theme = useTheme();
    const navigate = useNavigate();
    const { heroDeals, loading: heroLoading, error: heroError, setHeroDeals } = useHeroDeals();
    const { recentDeals, loading: recentLoading, error: recentError, setRecentDeals } = useRecentDeals();
    const { trendingDeals, loading: trendingLoading, error: trendingError, setTrendingDeals } = useTrendingDeals();
    const { isWaking, wakeFailed } = useAppWarmup();

    const heroDealsArr = heroDeals.dealsArr;
    const homepageContentPayload = { 
        hero: { heroDealsArr, heroLoading, heroError }, 
        trending: { trendingDeals, trendingLoading, trendingError },
        recent: { recentDeals, recentLoading, recentError },
        warmup: { isWaking, wakeFailed }
    };

    return (
        <>
            <Container sx={{ paddingTop: '56px' }}>
                <Navbar />
                <RenderHomepageContent payload={homepageContentPayload} />
                {/* <RenderHeroContent dealsArr={heroDealsArr} interval={10000} loading={heroLoading} error={heroError} />
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
                </Grid> */}
            </Container>
            <Footer />
        </>
    )
};