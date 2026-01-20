import { Box, useTheme } from "@mui/material";
import RenderOtherDeals from "./renderOtherDeals";
import RenderSpecificDeal from "./renderSpecificDeal";
import ErrorRender from "./errorCodeRender";
import LoadingRender from "./loadingRender";

export default function RenderSpecificDealContent ({ gamePayload, cheapestDealEver, otherDeals, loading, error, alertFeedback }) {

    const theme = useTheme();

    if (loading) {
        return (
            <Box sx={{ position: 'relative', minHeight: '50vh', display: 'grid', placeItems: 'center', mt: 7, borderRadius: '40px', overflow: 'hidden',  }}>
                <Box sx={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: theme.palette.tertiary.main, opacity: 0.25 }} />
                <LoadingRender />
            </Box>
        );
    };

    if (error) {
        return (
            <Box sx={{ height: '75vh', display: 'grid', placeItems: 'center' }}>
                <ErrorRender />
            </Box>
        );
    };

    return (
        <>
            <RenderSpecificDeal gamePayload={gamePayload} cheapestDealEver={cheapestDealEver} alertFeedback={alertFeedback} />
            <RenderOtherDeals otherDeals={otherDeals} />
        </>
    )
}