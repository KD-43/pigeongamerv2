import React from 'react';
import { Container, Grid, Box, Typography, useTheme, Button, Stack } from '@mui/material';

export default function SideContent ({direction, spacing, content, }) {

    const gridStyles = (obj) => Object.keys(obj).length > 0 ? obj.gridStyle : null;

    switch (direction) {
        case 'row':
            return (
                <Grid container spacing={spacing} sx={{ width: '100%', height: '100%', }}>
                    {Object.keys(content).length > 0 ? Object.entries(content).map(([key, value]) => (
                        <Grid key={key} size={Number(value.size ? value.size : 1)} sx={Object.keys(value.gridStyle).length > 0 ? value.gridStyle : null}>
                            <Typography variant={`${value.variant}`}>{value.body}</Typography>
                        </Grid>
                    )) : null }
                </Grid>
            );
        case 'column':
            return (
                <Stack spacing={spacing} sx={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                    {Object.keys(content).length > 0 ? Object.entries(content).map(([key, value]) => (
                        <Box key={key} sx={[{ width: '100%', height: `${(value.size) / 12}` }, gridStyles(value)]}>
                            <Typography key={key} variant={`${value.variant}`} sx={Object.keys(value.typeStyle).length > 0 ? value.typeStyle : null}>{value.body}</Typography>
                        </Box>
                    )) : null }
                </Stack>
            );
    }
}