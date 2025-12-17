import { useState } from 'react';
import { useNavigate } from 'react-router';
import apiConversion from '../util/apiDataConversion';
import {
  Card, CardHeader, CardContent, CardActions, Button, Divider, Stack, Box, alpha, darken, Typography, Grid, useTheme, IconButton, Modal
} from '@mui/material';
import { OpenInNew, Delete, InfoOutline, ArrowUpward, ArrowDownward, HorizontalRule, NewReleases} from '@mui/icons-material';
import RenderIcon from './render/renderIcons';

export default function Watchlist ({ title, items = [], actionLabel = 'View All', deleteItem, deleteStatus, onItemClick, version }) {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const { freeOrNah, storeName } = apiConversion();
    console.log('items in watchlist', items);

    const priceChangeIcons = [
        { icon: ArrowUpward, state: 'up', primaryColor: theme.palette.secondary.main, secondaryColor: theme.palette.tertiary.main, },
        { icon: ArrowDownward, state: 'down', primaryColor: theme.palette.primary.main, secondaryColor: theme.palette.tertiary.main, },
        { icon: HorizontalRule, state: 'same', primaryColor: theme.palette.tertiary.main, secondaryColor: theme.palette.black.default, },
        { icon: NewReleases, state: 'new', primaryColor: theme.palette.black.default, secondaryColor: theme.palette.tertiary.main, },
    ];

    if (items.length === 0) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '50vh', marginTop: 18, }}>
                <Typography>Your watchlist is empty. Add titles!</Typography>
            </Box>
        );
    }

    return (
        <Card variant="outlinedList" sx={{ 
            boxShadow: 'none',
            '&:hover': {
            boxShadow: 'none',
            },
            borderColor: theme.palette.tertiary.main, 
            borderWidth: '3px', 
            minWidth: '1fr', 
            display: 'flex', 
            flexGrow: '1', 
            flexDirection: 'column',
            my: 4,
        }}>

            <CardContent sx={{ py:0, px: 0, '&:last-child': { paddingBottom: 0, }}}>
                <Stack
                    // spacing={1}
                    divider={<Divider />}  // dividers appear only between items
                >
                    {items.map((item, i) => (
                        <Box
                            key={i}
                            onClick={onItemClick ? () => onItemClick(i) : undefined}
                            sx={(theme) => ({
                                px: 3,
                                py: 2,
                                cursor: onItemClick ? 'pointer' : 'default',
                                transition: theme.transitions.create(['background-color'], {
                                    duration: theme.transitions.duration.shortest,
                                }),
                                '&:hover': onItemClick
                                ? {
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.background.default,
                                    // fontWeight: 'bold',
                                    '.itemDiscount': {
                                    backgroundColor: theme.palette.background.default,
                                    color: theme.palette.secondary.main,
                                    boxShadow: `inset 0 0 0 2px ${theme.palette.secondary.main}`,
                                    borderRadius: '40px',
                                    },
                                    '.itemPrice': {
                                    backgroundColor: theme.palette.background.default,
                                    color: theme.palette.primary.main,
                                    },

                                }
                                : undefined,
                            })}
                        >
                            <Grid container spacing={2} sx={{ justifyContent: 'space-between'}}>

                                <Grid size={2} sx={{
                                    // maxWidth: 128,
                                    minWidth: 0,
                                    display: 'flex', 
                                    alignItems: 'center',
                                    whiteSpace: 'nowrap'

                                }}>
                                    <Typography sx={{ nowrap: 'true', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                                    {item.title ? item.title : ''}
                                    </Typography>
                                </Grid>

                                <Grid size={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Box sx={{ minWidth: 82, backgroundColor: theme.palette.tertiary.main, borderRadius: '40px', pt: '6px', pb: '3px', px: '16px', margin: 0 }}>
                                        <Typography variant="body1" color={'black'} fontWeight={'bold'} textAlign={'center'}>{item.currentPrice ? freeOrNah(item.currentPrice) : freeOrNah(item.lastSeenPrice)}</Typography>
                                    </Box>
                                </Grid>

                                <Grid size={1} sx={{ display: 'grid', placeItems: 'center', }}>
                                    <RenderIcon icons={priceChangeIcons} status={item.priceChange} onHover={false} />
                                </Grid>

                                <Grid size={1} sx={{ flexGrow: 1, display: 'grid', placeItems: 'center' }}>
                                    <Button variant={'black'} size={'medium'}>Go to page<InfoOutline /> </Button>
                                </Grid>

                                <Grid size={2} sx={{ flexGrow: 1, display: 'grid', placeItems: 'center' }}>
                                    <Button variant={'contained'} size={'medium'}>{item.storeID ? storeName(item.storeID) : '' }<OpenInNew /></Button>
                                </Grid>

                                <Grid size={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <IconButton onClick={() => deleteItem(item.gameID)}><Delete /></IconButton>
                                </Grid>

                            </Grid>
                        </Box>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}