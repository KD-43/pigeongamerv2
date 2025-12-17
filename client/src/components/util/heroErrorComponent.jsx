import { Box, LinearProgress, Typography, useTheme, Skeleton, CircularProgress } from '@mui/material';
import ErrorRender from '../render/errorCodeRender';

export default function HeroError ({ err }) {
    const theme = useTheme();

    return (
        <Box sx={{ border: `3px solid ${theme.palette.tertiary.main}`, borderRadius: '42px', marginTop: '56px', height: '514px', position: 'relative', overflow: 'hidden', }}>
            <Box sx={{ width: '100%', height: '100%', position: 'absolute', display: 'grid', placeItems: 'center' }}>
                <ErrorRender code={err} />
            </Box>
        </Box>
    )
};