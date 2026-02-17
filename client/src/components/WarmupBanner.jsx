import logo from '../assets/svg/PG_logo_main_256px.svg';
import { Box, useTheme, Typography,  } from '@mui/material';

export default function WarmupBanner({ status }) {
    const theme = useTheme();

    if (status === "ready" || status === "idle") return null;

    const message =
    status === "waking"
        ? "Waking up the server… (Render free tier can take ~10–30s after inactivity)"
        : "Server is taking longer than expected. Data may load shortly.";

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: "sticky",
                top: 0,
                zIndex: 9999,
                padding: "10px 12px",
                borderBottom: `1px solid rgba(0,0,0,0.12)`,
                background: theme.palette.black.default,
                color: theme.palette.background.default,
                backdropFilter: "blur(6px)",
            }}
            role="status"
            aria-live="polite"
        >
            <Box sx={{ p: 1 }}><img src={logo} width={48} height={48} /></Box>
            <Box sx={{ maxWidth: '500px', p: 2, }}>
                <Typography fontWeight={900} fontSize={18} textAlign={'center'}>{message}</Typography>
            </Box>
        </Box>
    );
}
