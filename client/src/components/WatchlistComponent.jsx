import { useState } from 'react';
import { useNavigate } from 'react-router';
import apiConversion from '../util/apiDataConversion';
import {
  Card, CardHeader, CardContent, CardActions, Button, Divider, Stack, Box, alpha, darken, Typography, Grid, useTheme, IconButton, Modal
} from '@mui/material';
import { OpenInNew, Delete, InfoOutline, ArrowUpward, ArrowDownward, HorizontalRule, NewReleases, Clear} from '@mui/icons-material';
import RenderIcon from './render/renderIcons';
import BasicModal from './util/basicModalComponent';

export default function Watchlist ({ title, items = [], actionLabel = 'View All', deleteItem, deleteStatus, onItemClick, replaceItem }) {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const tertiary = theme.palette.tertiary.main;
    const white = theme.palette.background.default;
    const black = theme.palette.black.default;
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalItem, setModalItem ] = useState({});
    const { freeOrNah, storeName, discountPercentage } = apiConversion();
    console.log('items in watchlist', items);

    const handleModalOpen = (i) => {
        setModalOpen(true);
        setModalItem(items[i]);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };

    const priceChangeBg = (priceChange) => {
        if (priceChange === null) return tertiary;

        switch (priceChange) {
            case "down":
                return primary;
            case "up":
                return secondary;
            default:
                return tertiary;
        };
    };

    const priceChangeColor = (priceChange) => {
        if (priceChange === null) return black;

        if (priceChange !== "same") {
            return white;
        } else {
            return black;
        }
    };

    if (items.length === 0) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '50vh', marginTop: 18, }}>
                <Typography>Your watchlist is empty. Add titles!</Typography>
            </Box>
        );
    }

    return (
        <>
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
                                sx={(theme) => ({
                                    px: 3,
                                    py: 2,
                                    
                                })}
                            >
                                <Grid container spacing={2} sx={{ }}>
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
                                        <Box sx={{ minWidth: 82, backgroundColor: priceChangeBg(item.priceChange), borderRadius: '40px', pt: '6px', pb: '3px', px: '16px', margin: 0 }}>
                                            <Typography variant="body1" color={priceChangeColor(item.priceChange)} fontWeight={'bold'} textAlign={'center'}>{item.currentPrice ? freeOrNah(item.currentPrice) : freeOrNah(item.lastSeenPrice)}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={4} sx={{ display: 'flex', gap: 1, }}>
                                        <Button onClick={onItemClick ? () => onItemClick(i) : undefined} variant={'black'} size={'medium'} sx={{ whiteSpace: 'nowrap', flexWrap: 'nowrap', display: 'flex', gap: 1, alignItems: 'space-between', justifyContent: 'center'}}>
                                            <Typography fontWeight={'900'} fontSize={'clamp(9px, 0.5vw, 12px)'}>
                                                Go to page
                                            </Typography>
                                            <InfoOutline /> 
                                        </Button>
                                        <Button LinkComponent={"a"} href={`https://www.cheapshark.com/redirect?dealID=${item.dealID}`} target="_blank" rel="noopener noreferrer" variant={'contained'} size={'medium'} sx={{ flexGrow: 1, whiteSpace: 'nowrap', display: 'flex', gap: 1, alignItems: 'space-between', justifyContent: 'center' }}>
                                            <Typography fontWeight={'900'} fontSize={'clamp(9px, 0.5vw, 12px)'}>
                                                {item.storeID ? storeName(item.storeID) : '' }
                                            </Typography>
                                            <OpenInNew sx={{}} />
                                        </Button>
                                    </Grid>
                                    <Grid size={3} sx={{ flexGrow: 1, flexWrap: 'nowrap', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        { item.ui.updateAvailable ? <Button onClick={() => handleModalOpen(i)} variant={'outlined-gray'} fullWidth size={'medium'} sx={{ height: '100%', flexGrow: 1, whiteSpace: 'nowrap', display: 'flex', gap: 1, alignItems: 'space-between', justifyContent: 'center' }}>
                                            <Typography fontWeight={'900'} fontSize={'clamp(9px, 0.5vw, 12px)'} color='primary.main'>New Deal</Typography>
                                        </Button>: <Clear sx={{ color: 'tertiary.main'}} />}
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
            <BasicModal 
                isOpen={modalOpen} 
                onClose={handleModalClose}
                item={modalItem}
                replaceItem={replaceItem}
            /> 
        </>
    );
}