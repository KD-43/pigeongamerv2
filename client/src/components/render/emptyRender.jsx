import { useState } from 'react';
import { Clear } from "@mui/icons-material";
import { Box, Typography } from '@mui/material';

export default function EmptyRender () {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <Box sx={{ width: '75px', height: 'auto' }}>
                <Clear color={'tertiary'} sx={{ width: '100%', height: '100%', }} />
            </Box>
            <Typography color={'tertiary'} variant='h4' fontWeight={'bold'}>No results found!</Typography>
        </Box>

    )
}