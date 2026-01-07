import { useState, useEffect } from 'react';
import { useTheme, Box, Button, Typography, Grid, Modal } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import apiConversion from '../../util/apiDataConversion';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(100%, 700px)',
    height: 'min(100%, 700px)',
    bgcolor: 'background.default',
    // border: '2px solid #000',
    borderRadius: 10,
    boxShadow: 24,
    p: 5,
};

export default function BasicModal({ isOpen, onClose, item }) {
    if (!isOpen) return null;
    if (!item) return null;
    if (!item.candidate) return null;

    const theme = useTheme();
    const { freeOrNah, storeName, discountPercentage } = apiConversion();
    const candidateItem = item.candidate;
    const trackedItem = item;
    const { title, storeID: trackedStore, currentPrice: trackedPrice, retailPrice } = trackedItem;
    const { storeID: candidateStore, currentPrice: candidatePrice } = candidateItem;

    const currentStore = storeName(trackedStore);
    const newStore = storeName(candidateStore);
    const currentPrice = freeOrNah(trackedPrice);
    const newPrice = freeOrNah(candidatePrice);
    const currentDiscount = discountPercentage(retailPrice, trackedPrice);
    const newDiscount = discountPercentage(retailPrice, candidatePrice);

    console.log(item ? item : '');


    return (
        <div>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={1} direction={'column'} sx={{ width: '100%', height: '100%',}}>
                        <Grid sx={{ width: '100%', flexGrow: 2, display: 'flex', flexDirection: 'column', alignItems: 'space-between' }}>
                            <Box>
                                <Typography id="modal-modal-title" variant="h3" fontWeight={'900'} color='primary.main'>
                                    Price Changed!
                                </Typography>
                                <Typography id="modal-modal-description" variant='body1' sx={{ mt: 2 }}>
                                    There is a <span style={{ textDecoration: 'underline'}}>cheaper deal</span> for <span style={{ fontWeight: 'bold' }}>{title}</span> at <span style={{ fontWeight: 'bold' }}>{newStore}</span> for <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>${candidatePrice}</span>
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
                                <Typography sx={{ mt: 4, alignSelf: 'end'}} fontWeight={'bold'} color='secondary.main'>
                                    Would you like to <span style={{ color: '#0b0b0c' }}>replace</span> tracked deal?
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid container direction={'column'} sx={{ width: '100%', height: 'auto', flexGrow: 7, }}>
                            <Grid size={12}>
                                <Typography variant='h6' fontWeight={'bold'}>Current</Typography>
                            </Grid>
                            <Grid container size={4} sx={{ width: '100%', border: `3px solid ${theme.palette.tertiary.main}`, borderRadius: 5, px: 2, py: 3}}>
                                <Grid size={4}><Typography variant='h5' fontWeight={'700'}>{currentStore}</Typography></Grid>
                                <Grid size={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Typography variant='h5' fontWeight={'700'}>
                                        {currentPrice}
                                    </Typography>
                                </Grid>
                                <Grid size={4} sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <Typography variant='h5' fontWeight={'700'}>
                                        {currentDiscount}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2, }}>
                                <ArrowDownward />
                            </Grid>
                            <Grid size={12}>
                                <Typography variant='h6' color={'primary'} fontWeight={'bold'}>New</Typography>
                            </Grid>
                            <Grid container size={4} sx={{ width: '100%', backgroundColor: 'primary.main', color: 'background.default', borderRadius: 5, px: 2, py: 3}}>
                                <Grid size={4}>
                                    <Typography variant='h5' fontWeight={'700'}>
                                        {newStore}
                                    </Typography>
                                </Grid>
                                <Grid size={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Typography variant='h5' fontWeight={'700'}>
                                        {newPrice}
                                    </Typography>
                                </Grid>
                                <Grid size={4} sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <Typography variant='h5' fontWeight={'700'}>
                                        {newDiscount}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid sx={{ width: '100%', display: 'flex', gap: 2, justifyContent: 'space-between', flexGrow: 1, }}>
                            <Button variant='square-gray' fullWidth>CANCEL</Button>
                            <Button variant='square-secondary' fullWidth>REPLACE</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
