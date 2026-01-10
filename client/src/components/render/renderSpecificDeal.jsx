import { Grid, Box, Typography, Stack, } from '@mui/material';
import BgImg from '../bgImgComponent';
import apiConversion from '../../util/apiDataConversion';

export default function RenderSpecificDeal ({ gamePayload, cheapestDealEver }) {
    const { freeOrNah, timeConvert } = apiConversion();
    const { price, date } = cheapestDealEver;

    console.log('cheapestDealEver', price);

    return (
        <Grid container spacing={2} sx={{ alignItems: 'center', mt: 7, }}>
            <Grid size={8} sx={{ position: 'relative' }}>
                <BgImg
                    width={'100%'} 
                    height={'350px'} 
                    py={3}
                    payload={gamePayload}
                />
            </Grid>
            <Grid size={4}>
                <Box sx={{ width: '100%', height: 350, border: '3px, solid,', borderColor: 'primary.main', borderRadius: '40px', overflow: 'hidden', }}>
                    <Stack spacing={2} sx={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', px: 3, }}>
                        <Box sx={{ width: '100%' }}>
                            <Typography variant={`h4`} fontWeight={'900'} sx={{ color: 'primary.main' }}>Lowest <br /> Deal Ever:</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: 'primary.main', px: 2 * 2, py: 2, borderRadius: 4,}}>
                            <Typography variant={`h4`} fontWeight={'bold'} sx={{ color: 'background.default' }}>{freeOrNah(price)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end', width: '100%', }}>
                            <Typography variant={`h5`} sx={{ color: 'primary.main' }}>{timeConvert(date)}</Typography>
                        </Box>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
};