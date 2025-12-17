import { Box, useTheme } from '@mui/material';
import { ImageNotSupported } from '@mui/icons-material';
import bgImg from '../../assets/images/pexels-arlindphotography-30894735.jpg';

export default function BrokenImageFallback ({ opacity }) {
    const theme = useTheme();

    return (
        <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, opacity: opacity || 100, borderRadius: '42px', }}>

            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(1)',
                    opacity: 0.5,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: theme.palette.primary.main,
                    mixBlendMode: 'overlay',
                    opacity: 0.8,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 80%)',
                    pointerEvents: 'none',
                    mixBlendMode: 'multiply',
                    opacity: 0.8,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'tertiary.main',
                    mixBlendMode: 'overlay',
                    opacity: 0.5,
                }}
            >
                <ImageNotSupported sx={{ fontSize: 84, opacity: 0.9 }} />
            </Box>
        </Box>
    )
};