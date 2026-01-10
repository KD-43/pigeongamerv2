import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, useTheme } from '@mui/material';

export function CreateWatchlistDialog({
  open,
  onClose,
  onSubmit,
  submitting = false,
  title = 'Create New Watchlist',
  label = 'Watchlist name',
}) {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const theme = useTheme();

    useEffect(() => {
        if (open) {
            setValue('');
            setError('');
        }
    }, [open]);

    const handleChange = (e) => {
        setValue(e.target.value);
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmed = value.trim();
        if (!trimmed) {
            setError('This field is required');
            return;
        }

        onSubmit(trimmed);
    };

    return (
        <Dialog open={open} onClose={submitting ? undefined : onClose} fullWidth maxWidth="xs" slotProps={{ paper: { sx: { borderRadius: '20px' }} }}>
            <form onSubmit={handleSubmit}>
                <DialogTitle sx={{ fontWeight: '900', color: theme.palette.primary.main }}>{title}</DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="normal"
                        label={label}
                        value={value}
                        onChange={handleChange}
                        error={!!error}
                        helperText={error || ' '}
                        disabled={submitting}
                    />
                </DialogContent>

                <DialogActions sx={{ px: '24px', pb: 2, }}>
                    <Button variant='square-gray' onClick={onClose} disabled={submitting}>
                    Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="square-secondary"
                        disabled={submitting}
                    >
                    {submitting ? 'Creating…' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
