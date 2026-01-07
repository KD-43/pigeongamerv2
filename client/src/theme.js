import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: '#009688',
            contrastText: '#F1F1F1',
        },
        secondary: {
            main: '#D500F9',
            contrastText: '#F1F1F1',
        },
        background: {
            default: '#F1F1F1',
        },
        tertiary: {
            main: '#DFDFDF',
        },
        divider: '#DFDFDF',
        black: {
            default: '#0b0c0c',
        }
        
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    variants: [
                        { 
                            props: { variant: 'outlined' }, 
                            style: {
                                backgroundColor: '#F1F1F1',
                                color: '#D500F9',
                                border: '1px solid #D500F9',
                                borderRadius: '40px',
                                fontWeight: 'bolder',
                                
                            },
                            
                        },
                        { 
                            props: { variant: 'outlined-gray' }, 
                            style: {
                                backgroundColor: '#F1F1F1',
                                color: '#0b0c0c',
                                border: '3px solid #DFDFDF',
                                borderRadius: '40px',
                                fontWeight: 'bolder',
                                
                            },
                            
                        },
                        { 
                            props: { variant: 'contained' }, 
                            style: {
                                backgroundColor: '#D500F9',
                                color: '#F1F1F1',
                                borderRadius: '40px',
                                fontWeight: '900',
                            }
                        },
                        { 
                            props: { variant: 'contained', size: 'medium' }, 
                            style: {
                                backgroundColor: '#D500F9',
                                boxShadow: 'none',
                                color: '#F1F1F1',
                                borderRadius: '40px',
                                fontWeight: '700',
                            }
                        },
                        { 
                            props: { variant: 'black', size: 'large' }, 
                            style: {
                                backgroundColor: '#0b0c0c',
                                color: '#F1F1F1',
                                borderRadius: '40px',
                                fontWeight: '900',
                                minHeight: 42,
                                lineHeight: 1.75,
                                paddingTop: 8,
                                paddingBottom: 8,
                            }
                        },
                        { 
                            props: { variant: 'black', size: 'medium' }, 
                            style: {
                                backgroundColor: '#0b0c0c',
                                color: '#F1F1F1',
                                borderRadius: '40px',
                                fontWeight: '700',
                                minWidth: 64,
                                minHeight: 36.5,
                                lineHeight: 1.75,
                                paddingTop: 6,
                                paddingBottom: 6,
                            }
                        },
                        { 
                            props: { variant: 'gray', size: 'large' }, 
                            style: {
                                backgroundColor: '#DFDFDF',
                                color: '#009688',
                                borderRadius: '40px',
                                fontWeight: '900',
                                minHeight: 42,
                                lineHeight: 1.75,
                                paddingTop: 8,
                                paddingBottom: 8,
                            }
                        },
                    ]
                }
            }
        },
        MuiIconButton: {
            variants: [
                {
                    props: { size: 'xl' },
                    style: {
                        padding: '16px',
                        '& .MuiSvgIcon-root': { fontSize: 32 },
                    },
                },
            ],
        },
        MuiCard: {
            variants: [
                {
                    props: { variant: 'outlinedList' },
                    style: ({ theme }) => ({
                        backgroundColor: 'transparent',
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: 'none',
                        borderRadius: '31px',
                        transition: theme.transitions.create('box-shadow', {
                            duration: theme.transitions.duration.shortest,
                        }),
                        '&:hover': {
                            boxShadow: theme.shadows[1],
                        },
                    }),
                },
            ]
        }
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1790,
        }
    },
});