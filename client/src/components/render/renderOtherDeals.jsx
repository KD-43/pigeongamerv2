import { Box, Typography, useTheme, Grid } from "@mui/material"
import { Clear } from "@mui/icons-material"
import List from "../List"

export default function RenderOtherDeals ({ otherDeals }) {
    const theme = useTheme();

    if (otherDeals.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px', borderRadius: '40px', border: `3px solid ${theme.palette.tertiary.main}`, my: 15, }}>
                <Box sx={{ width: '75px', height: 'auto' }}>
                    <Clear color={'tertiary'} sx={{ width: '100%', height: '100%', }} />
                </Box>
                <Typography color={'tertiary'} variant='h4' fontWeight={'bold'}>No other deals available!</Typography>
            </Box>
        )
    };

    return (
        <>
            <Typography variant='h4' fontWeight={'bold'} sx={{ mt: 10, color: 'primary.main'}}>Other deals to check out:</Typography>
            <List
                items={otherDeals}
                actionLabel="View More"
                onItemClick={(i) => console.log('Clicked item', items[i])}
                version={'alternative'}
                sx={{ my: 56, }}
            />
            <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center', mb: 10}}>
                <Grid sx={{}}>
                    <Typography variant={'h5'} color={theme.palette.tertiary.main} fontWeight={'bold'}>End of results</Typography>
                </Grid>
            </Grid>
        </>
    );
}