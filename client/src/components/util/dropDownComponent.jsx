import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Grow,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  CircularProgress,
  Typography
} from '@mui/material';
import { ExpandMore, AddCircleOutline } from '@mui/icons-material';
import { useAddItemToWatchlist } from '../../hooks/watchlists/useAddItemToWatchlist';

export function DropdownButton({
    label = 'Add to Watchlist',
    items = [],
    payload,
    loading,
    error,
    onCreateNew,
    fullWidth = true,
    alertFeedback
}) {
    const theme = useTheme();
    const [ open, setOpen ] = useState(false);
    const [ isAdding, setIsAdding ] = useState(false);
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const { execute, targetWatchlistId, loading: addItemLoading, error: addItemError  } = useAddItemToWatchlist();

    if (payload) {
        console.log('salePrice', payload.salePrice);
    }

    useEffect(() => {
        if (!open) {
            return;
        };

        const handleClickOutside = (event) => {
            const isNotOnMenu = menuRef.current && !menuRef.current.contains(event.target);
            const isNotOnBtn = buttonRef.current && !buttonRef.current.contains(event.target);

            if (open) {
                if (isNotOnMenu && isNotOnBtn) {
                    setOpen(false);
                };
            } else if (isNotOnMenu) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [open]);

    const handleToggle = () => {
        setOpen(prev => !prev);
    };

    const handleAddToWatchlist = async (id, payload) => {
        if (!id || !payload) {
            alertFeedback('add', 'error');
            return null;
        };

        setIsAdding(true);
        try {
            execute(id, payload);
            alertFeedback('add', 'success');
        } catch (err) {
            alertFeedback('add', 'error');
        } finally {
            setIsAdding(false);
        }
    };

    const isOpen = () => {
        if (open) return 'Menu is open!';
        else return 'Menu is not open!';
    }

    console.log(isOpen());

    const renderDropDownOptions = () => {
        if (error) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Typography variant='h4' color='secondary.main' fontWeight={'bold'}>Error: {error}</Typography>
                </Box>
            )
        };
        
        if (loading) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '75vh' }}>
                    <CircularProgress size={56} />
                </Box>
            )
        }

        if (items.length === 0) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', py: 10, textAlign: 'center', color: theme.palette.tertiary.main }}>
                    <Typography>You don't have any watchlists.<br /> Create one!</Typography>
                </Box>
            );
        }

        return (
            <List dense disablePadding>
                {items.map((item, i) => (
                    <ListItemButton
                        key={i}
                        onClick={() => handleAddToWatchlist(item.id, payload)}
                        sx={{ px: 4, }}
                    >
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                ))}
            </List>
        );
    }


    return (
        <Box sx={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
            <Button
                ref={buttonRef}
                onClick={handleToggle}
                fullWidth={fullWidth}
                variant="gray"
                size="large"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    position: 'relative',
                    zIndex: 10,
                    transition: '0.01s all ease-in',
                    borderBottomLeftRadius: open ? 0 : 40,
                    borderBottomRightRadius: open ? 0 : 40,
                }}
            >
            {label} <ExpandMore
                sx={{
                    transition: 'transform 150ms ease',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
            />
            </Button>

            <Grow in={open} timeout={0.1} style={{ transformOrigin: 'top center',}} unmountOnExit>
                <Box ref={menuRef} sx={{
                    position: 'absolute',
                    zIndex: 5,
                    top: '100%',
                    left: 0,
                    right: 0,
                }}>
                    <Box
                        sx={{
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomLeftRadius: 40,
                            borderBottomRightRadius: 40,
                            bgcolor: 'background.paper',
                            boxShadow: 3,
                            overflow: 'hidden',

                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: 260,
                            minHeight: 'auto'
                        }}
                    >
                        <Box sx={{ flex: 1, overflowY: 'auto', }}>
                            {renderDropDownOptions()}
                        </Box>
                        <Divider />
                        <Box sx={{ backgroundColor: theme.palette.primary.main }}>
                            <ListItemButton 
                                onClick={onCreateNew ? () => onCreateNew() : undefined}
                                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}
                            >
                                <Box onClick={() => onCreateNew()} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: theme.palette.background.default, fontWeight: '900', fontSize: ''}}>
                                    <AddCircleOutline fontSize="small" />
                                    <span>CREATE WATCHLIST</span>
                                </Box>
                            </ListItemButton>
                        </Box>
                    </Box>
                </Box>
            </Grow>
        </Box>
    );
}
