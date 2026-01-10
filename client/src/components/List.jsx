import { useNavigate } from 'react-router';
import {
  Card, CardHeader, CardContent, CardActions, Button, Divider, Stack, Box, alpha, darken, Typography, Grid, useTheme, IconButton
} from '@mui/material';
import { OpenInNew, Delete } from '@mui/icons-material';
import apiConversion from '../util/apiDataConversion';
import { useState } from 'react';
import ErrorRender from './render/errorCodeRender';
import LoadingRender from './render/loadingRender';

export default function List({ title, items = [], actionLabel = 'View All', onAction, onItemClick, version, itemsError, itemsLoading }) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const { freeOrNah, storeName, discountPercentage } = apiConversion();
  const [ isHovered, setIsHovered ] = useState(false);
  const navigate = useNavigate();
  
  console.log("Current items in List component: ", items);

  if (itemsError) {
    return (
      <Card variant="outlinedList" sx={{ 
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        borderColor: theme.palette.tertiary.main, 
        borderWidth: '3px',
        display: 'flex', 
        flexGrow: '1', 
        flexDirection: 'column', 
        py: 2,
        height: '100%',
        justifyContent: 'center',

      }}>

        <ErrorRender sx={{ width: '100%', height: '100%', alignSelf: 'center' }} />
      </Card>
    )
  }

  if (itemsLoading) {
    return (
      <Card variant="outlinedList" sx={{ 
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        borderColor: theme.palette.tertiary.main, 
        borderWidth: '3px',
        display: 'flex', 
        flexGrow: '1', 
        flexDirection: 'column', 
        py: 2

      }}>
        <LoadingRender sx={{ width: '100%', height: '100%', alignSelf: 'center' }}  />
      </Card>
    )
  }

  switch (version) {
    case 'standard':
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

                    <Grid size={3} sx={{
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
                    <Grid size={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography>{item.storeID ? storeName(item.storeID) : '' }</Typography>
                    </Grid>

                    <Grid container size={3} spacing={1} sx={{ display: 'flex', justifyContent: 'end'}}>
                      <Grid>
                        <Box className={'itemPrice'} sx={{ 
                            flex: '0 0 75px',
                            width: 75,
                            minWidth: 75,
                            height: 33,
                            borderRadius: '40px',
                            bgcolor: 'tertiary.main',
                            color: 'black',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            boxSizing: 'border-box',
                            fontVariantNumeric: 'tabular-nums',
                            px: 1.5,
                        }}>
                            {item.salePrice ? freeOrNah(item.salePrice ) : '' }
                        </Box>
                      </Grid>

                      <Grid>
                        <Box className={'itemDiscount'} sx={{ 
                            flex: '0 0 75px',
                            width: 75,
                            minWidth: 75,
                            height: 33,
                            borderRadius: '40px',
                            bgcolor: 'primary.main',
                            color: 'background.default',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            
                            boxSizing: 'border-box',
                            fontVariantNumeric: 'tabular-nums',
                            px: 1.5,
                        }}>
                            {Number(item.savings).toFixed(0) + '%'}
                        </Box>
                      </Grid>

                    </Grid>

                  </Grid>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      );
    case 'alternative':
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
          mb: 4,
          mt: 2,
        }}>

          <CardContent sx={{ py:0, px: 0, '&:last-child': { paddingBottom: 0, }}}>
            <Stack
              // spacing={1}
              divider={<Divider />}  // dividers appear only between items
            >
              {items.map((item, i) => (
                <Box
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  key={i}
                  sx={(theme) => ({
                    px: 3,
                    py: 2,
                    transition: theme.transitions.create(['background-color'], {
                      duration: theme.transitions.duration.shortest,
                    }),
                    '&:hover': onItemClick
                      ? {
                          backgroundColor: theme.palette.tertiary.main,
                          color: 'black',
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
                          '.itemRegPrice': {
                            color: 'black',
                          },
                          '.otherDeals_cta': {
                            backgroundColor: 'secondary.main',
                            color: 'background.default',
                          }

                        }
                      : undefined,
                  })}
                >
                  <Grid container spacing={2} sx={{ justifyContent: 'space-between'}}>

                    <Grid size={4} sx={{
                      // maxWidth: 128,
                      minWidth: 0,
                      display: 'flex', 
                      alignItems: 'center',
                      whiteSpace: 'nowrap'

                    }}>
                        <Typography sx={{ nowrap: 'true', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                          {item.storeID ? storeName(item.storeID) : '' }
                        </Typography>
                    </Grid>

                    <Grid container size={4} spacing={1} sx={{ display: 'flex', justifyContent: 'center'}}>
                      <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <Box className={'itemRegPrice'} sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', color: 'grey.500', textDecoration: 'line-through'}}>
                          { item.retailPrice ? Number(item.retailPrice).toFixed(2) : '' }
                        </Box>
                      </Grid>
                      <Grid container spacing={1} sx={{ display: 'inline-flex'}}>
                        <Grid size={6}>
                          <Box className={'itemPrice'} sx={{
                            flex: '0 0 75px',
                            width: 75,
                            minWidth: 75,
                            height: 33,
                            borderRadius: '40px',
                            bgcolor: 'tertiary.main',
                            color: 'black',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            boxSizing: 'border-box',
                            fontVariantNumeric: 'tabular-nums',
                            px: 1.5,
                          }}>
                            {item.salePrice ? freeOrNah(item.salePrice ) : '' }
                          </Box>
                        </Grid>
                        <Grid size={6}>
                          <Box className={'itemDiscount'} sx={{
                            flex: '0 0 75px',
                            width: 75,
                            minWidth: 75,
                            minHeight: 33,
                            borderRadius: '40px',
                            bgcolor: 'primary.main',
                            color: 'background.default',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                      
                            boxSizing: 'border-box',
                            fontVariantNumeric: 'tabular-nums',
                            px: 1.5,
                          }}>
                            {item.retailPrice && item.salePrice ? discountPercentage(item.retailPrice, item.salePrice) : ''}
                          </Box>
                        </Grid>
                      </Grid>

                    </Grid>

                    <Grid size={4} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        <Button LinkComponent={"a"} href={`https://www.cheapshark.com/redirect?dealID=${item.dealID}`} target="_blank" rel="noopener noreferrer" className='otherDeals_cta' sx={{ border: '1px solid', borderColor: 'secondary.main', borderRadius: '20px', color: 'secondary.main', transition: 'all 0.1s ease-in', display: 'flex',  justifyContent: 'space-between', alignItems: 'center', gap: 1, }}>
                          <Typography variant='body2' fontWeight={'900'}>Go to deal</Typography><OpenInNew />
                        </Button>
                    </Grid>

                  </Grid>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      );
    case 'tertiary':
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
                  onClick={onItemClick ? (e) => { e.stopPropagation(); onItemClick(i)} : undefined}
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

                    <Grid size={4} sx={{
                      // maxWidth: 128,
                      minWidth: 0,
                      display: 'flex', 
                      alignItems: 'center',
                      whiteSpace: 'nowrap'

                    }}>
                        <Typography sx={{ nowrap: 'true', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                          {item.name ? item.name : ''}
                        </Typography>
                    </Grid>

                    <Grid size={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography>{item.updatedAt ? item.updatedAt.split(',')[0] : '' }</Typography>
                    </Grid>

                    <Grid size={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography>{item.itemCount ? item.itemCount : '' }</Typography>
                    </Grid>

                    <Grid size={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography>{item.hasDrop ? item.dropCount : '-' }</Typography>
                    </Grid>

                    <Grid size={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton onClick={onAction ? (e) => { e.stopPropagation(); onAction(i)} : undefined}><Delete /></IconButton>
                    </Grid>

                  </Grid>
                  
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      );
    default:
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

                    <Grid size={3} sx={{
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
                    <Grid size={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography>{item.storeID ? storeName(item.storeID) : '' }</Typography>
                    </Grid>

                    <Grid container size={3} spacing={1} sx={{ display: 'flex', justifyContent: 'end'}}>
                      <Grid>
                        <Box className={'itemPrice'} sx={{ 
                            flex: '0 0 75px',
                            width: 75,
                            minWidth: 75,
                            height: 33,
                            borderRadius: '40px',
                            bgcolor: 'tertiary.main',
                            color: 'black',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            boxSizing: 'border-box',
                            fontVariantNumeric: 'tabular-nums',
                            px: 1.5,
                        }}>
                            {item.price ? freeOrNah(item.price ) : '' }
                        </Box>
                      </Grid>

                      <Grid>
                        <Box className={'itemDiscount'} sx={{ 
                            flex: '0 0 75px',
                            width: 75,
                            minWidth: 75,
                            height: 33,
                            borderRadius: '40px',
                            bgcolor: 'primary.main',
                            color: 'background.default',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            
                            boxSizing: 'border-box',
                            fontVariantNumeric: 'tabular-nums',
                            px: 1.5,
                        }}>
                            {Number(item.savings).toFixed(0) + '%'}
                        </Box>
                      </Grid>

                    </Grid>

                  </Grid>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      );
  }
}
