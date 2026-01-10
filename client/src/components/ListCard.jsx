import apiConversion from '../util/apiDataConversion';
import {
  Card, CardHeader, CardContent, CardActions, Button, Divider, Stack, Box, alpha, darken, Typography, Grid, Skeleton, useTheme
} from '@mui/material';
import ErrorRender from './render/errorCodeRender';

export default function ListCardStack({ title, items = [], actionLabel = 'View All', onAction, onItemClick, itemsLoading, itemsError }) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const { freeOrNah, storeName } = apiConversion();

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
        height: '100%'

      }}>
        <CardHeader title={title} slotProps={{ title: { variant: 'h4', sx: { fontWeight: 'bold' } } }} sx={{ py: 2, color: primary }} />

        <CardContent sx={{ width: '100%', }}>

            <ErrorRender code={itemsError.error} />

        </CardContent>

        <CardActions sx={{ justifyContent: 'center', pt: 1.5 }}>
          <Button disabled variant="contained" size="large" onClick={onAction}>
            {actionLabel}
          </Button>
        </CardActions>
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
        <CardHeader title={title} slotProps={{ title: { variant: 'h4', sx: { fontWeight: '900' } } }} sx={{ py: 2, color: primary }} />

        <CardContent sx={{ width: '100%', }}>

            {itemsLoading && (Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} sx={{ height: '65px', }} />
              )
            ))}

        </CardContent>

        <CardActions sx={{ justifyContent: 'center', pt: 1.5 }}>
          <Button disabled variant="contained" size="large" onClick={onAction}>
            {actionLabel}
          </Button>
        </CardActions>
      </Card>
    )
  }

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
      <CardHeader title={title} slotProps={{ title: { variant: 'h4', sx: { fontWeight: '900' } } }} sx={{ py: 2, color: primary }} />

      <CardContent sx={{ width: '100%', pt: 1, pb: 1, px: 0, }}>
        <Stack
          // spacing={1}
          divider={<Divider />}  // dividers appear only between items
        >
          {items.slice(0, 6).map((item, i) => (
            <Box
              key={i}
              onClick={onItemClick ? () => onItemClick(i) : undefined}
              sx={(theme) => ({
                width: '100%',
                px: 2,
                py: 2,
                textDecoration: 'none',
                color: 'inherit',
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
              <Grid container spacing={2} sx={{ width: '100%', }}>

                    <Grid size={4} sx={{
                      display: 'flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      flexGrow: 1,
                    }}>
                        <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', }}>
                          {item.title}
                        </Typography>
                    </Grid>
                    <Grid size={4} sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      flexGrow: 1,
                    }}>
                        <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', }}>
                          {storeName(item.storeID)}
                        </Typography>
                    </Grid>
                    <Grid container size={4} spacing={1} sx={{ display: 'flex', justifyContent: 'end', flexWrap: 'nowrap', flexGrow: 1, }}>
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
                            {freeOrNah(item.salePrice)}
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
                            {Math.floor(item.savings) + '%'}
                        </Box>
                      </Grid>
                    </Grid>

              </Grid>
            </Box>
          ))}
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center', pt: 1.5 }}>
        <Button variant="contained" size="large" onClick={onAction}>
          {actionLabel}
        </Button>
      </CardActions>
    </Card>
  );
}
