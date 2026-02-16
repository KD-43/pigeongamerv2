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
                position: "sticky",
                top: 0,
                zIndex: 9999,
                padding: "10px 12px",
                borderBottom: `1px solid rgba(0,0,0,0.12)`,
                background: theme.palette.background.default,
                backdropFilter: "blur(6px)",
            }}
            role="status"
            aria-live="polite"
        >
            <img src={logo} width={186} height={186} />
            <Box sx={{ maxWidth: '600px', }}>
                <Typography fontWeight={900} fontSize={24} textAlign={'center'}>{message}</Typography>
            </Box>
        </Box>
    );
}
