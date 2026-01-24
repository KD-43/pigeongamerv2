import { Alert, useTheme } from '@mui/material';

export default function FilledAlerts({
    onClose,
    severity, 
    message = { 
        success: "This is a filled success Alert.", 
        info: "This is a filled info Alert.",
        warning: "This is a filled warning Alert.",
        error: "This is a filled warning Alert.",
    } 
}) {
    const theme = useTheme();

    switch (severity) {
        case 'success':
            return (
                <Alert onClose={onClose} variant="filled" severity="success" sx={{ width: '100%', justifyContent: 'center','& .MuiAlert-message': { textAlign: 'center', width: '100%' } }}>
                    {message ? message.success ? message.success : "This is a filled success Alert." : "This is a filled success Alert."}
                </Alert>
            )
        case 'info':
            return (
                <Alert onClose={onClose} variant="filled" severity="info" sx={{ width: '100%','& .MuiAlert-message': { textAlign: 'center', width: '100%' } }}>
                    {message ? message.info ? message.info : "This is a filled success Alert." : "This is a filled info Alert."}
                </Alert>
            )
        case 'warning':
            return (
                <Alert onClose={onClose} variant="filled" severity="warning" sx={{ width: '100%','& .MuiAlert-message': { textAlign: 'center', width: '100%' } }}>
                    {message ? message.warning ? message.warning : "This is a filled success Alert." : "This is a filled warning Alert."}
                </Alert>
            )
        case 'error':
            return (
                <Alert onClose={onClose} variant="filled" severity="error" sx={{ width: '100%','& .MuiAlert-message': { textAlign: 'center', width: '100%' } }}>
                    {message ? message.error ? message.error : "This is a filled success Alert." : "This is a filled error Alert."}
                </Alert>
            )
        default:
            return (
                <Alert onClose={onClose} variant="filled" severity="info" sx={{ width: '100%','& .MuiAlert-message': { textAlign: 'center', width: '100%' } }}>
                    {message ? message.info ? message.info : "This is a filled success Alert." : "This is a filled info Alert."}
                </Alert>
            );
    };
}