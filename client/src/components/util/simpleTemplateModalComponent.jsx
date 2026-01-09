import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material';

export default function SimpleModal({ 
    isOpen,
    onClose,
    content = { title: 'Title', body: 'Body', abort: 'Cancel', cta: 'OK' },
    onSubmit,
    formId = 'simple-modal-form',
    children,
    disableSubmit = false,
    maxWidth = 'xs',
    fullWidth = true,
}) {

    const theme = useTheme();
    const { title, body, cta, abort } = content;

    const hasSubmit = Boolean(onSubmit);

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth} slotProps={{ paper: { sx: { borderRadius: '10px' }} }}>
            {title ? <DialogTitle sx={{ fontWeight: '900', color: theme.palette.primary.main, pb: 1, }}>{title}</DialogTitle> : null}

            <DialogContent>
            {body ? <DialogContentText sx={{ pb: 2, }}>{body}</DialogContentText> : null}

            {hasSubmit ? (
                <form id={formId} onSubmit={onSubmit}>
                    {children}
                </form>
            ) : (
                children
            )}
            </DialogContent>

            <DialogActions sx={{ pb: 2, px: 3, }}>
                <Button variant='square-gray' onClick={onClose}>{abort}</Button>

                {hasSubmit ? (
                    <Button type="submit" form={formId} variant="square-secondary" disabled={disableSubmit}>
                        {cta}
                    </Button>
                ) : null}
            </DialogActions>
        </Dialog>
    );
}
