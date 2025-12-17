import { Box, LinearProgress, Typography, useTheme, Skeleton, CircularProgress } from '@mui/material';
import bgImg from '../../assets/images/pexels-arlindphotography-30894735.jpg';
import textureOverlay from "../../assets/images/pexels-seamlesstextures-11236676_downSize.jpg";

export default function HeroLoading () {
    const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: '42px', marginTop: '56px', height: '514px', position: 'relative', overflow: 'hidden', }}>
            <Box sx={{ width: '100%', height: '100%', position: 'relative', display: 'grid', placeItems: 'center' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${bgImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(1) invert(1)',
                        opacity: 0.5,
                        mixBlendMode: 'multiply',
                    }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${textureOverlay})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(1)',
                        mixBlendMode: 'multiply',
                        opacity: 0.25,
                        pointerEvents: 'none',
                    }}
                />

                <CircularProgress color='tertiary' size={50} sx={{ mixBlendMode: 'overlay', position: 'absolute' }} />

            </Box>
        </Box>
    )
};