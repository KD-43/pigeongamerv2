import { useEffect, useState } from 'react';
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
        <Box
            sx={{
                position: 'fixed',
                bottom: 24,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: (theme) => theme.zIndex.snackbar,
                width: '100%',
                maxWidth: 520,
                px: 2,
                boxSizing: 'border-box',
                pointerEvents: 'none',
        }}
        >
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <Box sx={{ pointerEvents: 'auto' }}>
                    <FilledAlerts severity={severity} message={message} onClose={onClose} />
                </Box>
            </Slide>
        </Box>
    );
}
