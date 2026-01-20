import { useEffect, } from 'react';
import { Alert, Box, Slide } from '@mui/material';
import FilledAlerts from '../util/alertFeedback';

export default function BottomCenterAlert({ open, onClose, severity, message, autoHideMs = 6000}) {

    useEffect(() => {
        if (!open) return;

        const timer = setTimeout(() => {
            onClose();
        }, autoHideMs);

        return () => clearTimeout(timer);

    }, [open, autoHideMs, onClose]);

    // useEffect(() => {
    //     if (!open) console.log("[BotCenAlert] - alert is open:", open);

    //     console.log("[BotCenAlert] - alert is open:", open);
    //     console.log("[BotCenAlert] - severity:", severity);
    //     console.log("[BotCenAlert] - message:", message);
    // }, [ open, severity, message ])

    return (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Box sx={{
                    position: 'fixed',
                    bottom: 24,
                    left: '45%',
                    transform: 'translateX(-50%)',
                    zIndex: (theme) => theme.zIndex.snackbar,
                    maxWidth: '90vw',
                }}
            >
                <FilledAlerts severity={severity} message={message} />
            </Box>
        </Slide>
    );
}
