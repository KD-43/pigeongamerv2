import { useState } from 'react';
import { useSpecificDeal } from '../hooks/deals/useSpecificDeal.js';
import { Container, Grid, Box, Typography, useTheme, Button, Stack, Portal } from '@mui/material';
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
import BottomCenterAlert from '../components/render/renderAlertFeedback.jsx';


export default function SpecificDeal () {

    const [ alertOpen, setAlertOpen ] = useState(false);
    const [ alertMessage, setAlertMessage ] = useState({});
    const [ alertSeverity, setAlertSeverity ] = useState('info');
    const theme = useTheme();
    const params = useParams();
    const dealId = decodeURIComponent(params.dealId);
    console.log("[SpecificDealPage]", dealId ? dealId : 'not available');
    const { specificDeal, loading, error, setSpecificDeal } = useSpecificDeal(dealId);

    const gameInfo = specificDeal ? specificDeal.gameInfo : [];
    const otherDealsArr = specificDeal ? specificDeal.cheaperStores : [];
    const cheapestEver = specificDeal ? specificDeal.cheapestPrice : [];
    const dealPayload = gameInfo ? { dealId, gameInfo } : [];
    const gameName = gameInfo ? gameInfo.name ? gameInfo.name : 'Title' : 'Title';
    console.log( 'dealPayload',dealPayload);
    console.log('specificDeal', specificDeal);

    const addAlertFeedbackMessage = {
        success: `${gameName} added to watchlist!`, 
        info: "This is a filled info Alert.",
        warning: "Something unexpected happened.",
        error: `Something went wrong. Unable to add ${gameName} to watchlist. Try again soon.`,
    };

    const createFeedbackMessage = {
        success: `Watchlist created!`, 
        info: "This is a filled info Alert.",
        warning: "Something unexpected happened.",
        error: `Something went wrong. Unable to create new watchlist. Try again soon.`,
    };

    const alertFeedback = (alertType, actionStatus) => {
        if (alertType === 'add') {
            setAlertMessage(addAlertFeedbackMessage);
            setAlertSeverity(actionStatus);
        } else if (alertType === 'create') {
            setAlertMessage(createFeedbackMessage);
            setAlertSeverity(actionStatus);
        }

        setAlertOpen(true);
    };
    
    return (
        <>
            <Container sx={{ paddingTop: 7, minHeight: '100vh', pb: 20, }}>
                <Navbar />

                <RenderSpecificDealContent alertFeedback={alertFeedback} gamePayload={dealPayload} cheapestDealEver={cheapestEver ? cheapestEver : []} otherDeals={otherDealsArr ? otherDealsArr : []} loading={loading} error={error} />

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
            <Portal>
                <BottomCenterAlert open={alertOpen} onClose={() => setAlertOpen(false)} severity={alertSeverity} message={alertMessage} />
            </Portal>
            <Footer />
        </>
    )
};