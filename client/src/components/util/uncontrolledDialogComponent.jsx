import { useState } from 'react';
import { useCreateWatchlist } from '../hooks/watchlists/useCreateWatchlist';
import { useNavigate } from 'react-router'
import { CreateWatchlistDialog } from './dialogComponent';

export default function UncontrolledDialog () {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { execute, watchlist, loading, error } = useCreateWatchlist();

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => {
        if (submitting) return; // avoid closing while submitting
        setDialogOpen(false);
    };

    const handleCreateWatchlist = async (name) => {
        try {
            setSubmitting(true);

            const newList = await execute(name);
            const id = newList.id || newList._id;

            setDialogOpen(false);

            navigate(`/watchlists/${id}`);
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <CreateWatchlistDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            onSubmit={handleCreateWatchlist}
            submitting={submitting}
        />
    )
};