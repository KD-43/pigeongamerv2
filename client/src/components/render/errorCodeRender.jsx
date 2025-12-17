import { useState } from 'react';
import { ErrorOutline } from "@mui/icons-material";
import { Box, Typography } from '@mui/material';

export default function ErrorRender ({ code }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <Box sx={{ width: '75px', height: 'auto' }}>
                <ErrorOutline color={'secondary'} sx={{ width: '100%', height: '100%', }} />
            </Box>
            <Typography color={'secondary'} variant='h4' fontWeight={'bold'}>{code || 'An Error occurred!'}</Typography>
        </Box>

    )
}