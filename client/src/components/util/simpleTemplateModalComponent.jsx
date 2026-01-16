import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function SimpleModal({ 
    isOpen,
    onClose,
    content = { title: 'Title', body: 'Body', abort: 'Cancel', cta: 'OK' },
    styles = { titleSize: null, bgColor: '', titleColor: 'primary.main', bodyColor: 'black.default', cancelVariant: 'square-gray', ctaVariant: 'square-secondary' },
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
        <Dialog open={isOpen} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth} slotProps={{ paper: { sx: { borderRadius: '10px', backgroundColor: styles.bgColor, }} }}>
            {title ? <DialogTitle fontWeight={'900'} sx={{ fontSize: styles.titleSize ? styles.titleSize : null, color: styles.titleColor ? styles.titleColor : 'primary.main', pb: 1, }}>{title}</DialogTitle> : null}

            <DialogContent>
            {body ? <DialogContentText sx={{ pb: 2, color: styles.bodyColor }}>{body}</DialogContentText> : null}

            {hasSubmit ? (
                <form id={formId} onSubmit={onSubmit}>
                    {children}
                </form>
            ) : (
                children
            )}
            </DialogContent>

            <DialogActions sx={{ pb: 2, px: 3, }}>
                <Button variant={styles.cancelVariant ? styles.cancelVariant : 'square-gray'} onClick={onClose}>{abort}</Button>

                {hasSubmit ? (
                    <Button type="submit" form={formId} variant={styles.ctaVariant ? styles.ctaVariant : 'square-secondary'} disabled={disableSubmit}>
                        {cta}
                    </Button>
                ) : null}
            </DialogActions>
        </Dialog>
    );
}
