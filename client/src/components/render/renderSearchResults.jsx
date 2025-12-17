import { useNavigate } from 'react-router';
import { Typography, Grid, useTheme, Box } from '@mui/material';
import List from "../List";
import ErrorRender from './errorCodeRender';
import LoadingRender from './loadingRender';
import EmptyRender from './emptyRender';

export default function RenderSearchResults ({ results, loading, error }) {
    const navigate = useNavigate();
    const theme = useTheme();


    if (!loading && !error && results.length === 0) {
        return (
            <EmptyRender />
        );
    };

    if (error) {
        return (
            <ErrorRender error={error} />
        );
    };
    
    if (loading) {
        return (
            <LoadingRender />
        );
    };

    return (
        <>
            <List
                items={results ? results : []}
                actionLabel="View More"
                onItemClick={(i) => navigate(`/deals/details/${results[i].dealID}`)}
                version={'standard'}
                sx={{ my: 56, }}
            />
            <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center'}}>
                <Grid sx={{}}>
                    <Typography variant={'h5'} color={theme.palette.tertiary.main} fontWeight={'bold'}>End of results</Typography>
                </Grid>
            </Grid>
        </>
    );
}