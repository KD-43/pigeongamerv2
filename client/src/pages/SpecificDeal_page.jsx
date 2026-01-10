import { useSpecificDeal } from '../hooks/deals/useSpecificDeal.js';
import { Container, Grid, Box, Typography, useTheme, Button, Stack } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import List from '../components/List';
import Searchbar from '../components/Searchbar';
import Footer from '../components/FooterComponent';
import test from '../assets/Cato-and company against death guard_ardvvr-artstation.jpg';
import BgImg from '../components/bgImgComponent';
import SideContent from '../components/sideContentComponent';
import apiConversion from '../util/apiDataConversion';
import RenderSpecificDealContent from '../components/render/renderSpecificDealContent.jsx';


export default function SpecificDeal () {

    const { freeOrNah, storeName, dayConvert, monthConvertName, timeConvert, } = apiConversion();
    const theme = useTheme();
    const params = useParams();
    const dealId = params.dealId;
    const { specificDeal, loading, error, setSpecificDeal } = useSpecificDeal(dealId);

    const gameInfo = specificDeal ? specificDeal.gameInfo : [];
    const otherDealsArr = specificDeal ? specificDeal.cheaperStores : [];
    const cheapestEver = specificDeal ? specificDeal.cheapestPrice : [];
    // console.log('gameInfo', gameInfo);
    const dealPayload = gameInfo ? { dealId, gameInfo } : [];
    console.log( 'dealPayload',dealPayload);
    console.log('specificDeal', specificDeal);
    
    return (
        <>
            <Container sx={{ paddingTop: 7, minHeight: '100vh', pb: 20, }}>
                <Navbar />

                <RenderSpecificDealContent gamePayload={dealPayload} cheapestDealEver={cheapestEver ? cheapestEver : []} otherDeals={otherDealsArr ? otherDealsArr : []} loading={loading} error={error} />

                <Grid container spacing={8} justifyContent={'space-between'} sx={{}}>
                    <Grid size={6}>
                        <Typography variant="h3" fontWeight={'900'} color={'primary'} textAlign={'end'}>
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
    )
};