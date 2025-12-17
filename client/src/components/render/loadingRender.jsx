import { Box, CircularProgress } from '@mui/material';

export default function LoadingRender () {
    return (
        <Box sx={{ display: 'grid', placeItems: 'center', }}>
            <CircularProgress size={50} />
        </Box>
    )
}