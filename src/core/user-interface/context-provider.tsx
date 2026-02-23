import { createContext, useContext, type PropsWithChildren } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import type { Theme } from './types';
import { ToastProvider } from './toast';

const MUItheme = createTheme({
    typography: {
        fontFamily: 'Public Sans, sans-serif',
        h4: {
            fontSize: 24,
            lineHeight: 36 / 24,
            fontWeight: 700
        }
    },
    palette: {
        primary: {
            main: '#22C55E'
        },
        text: {
            primary: '#212B36',
            secondary: '#637381'
        },
        divider: 'rgba(145, 158, 171, 0.2)',
        success: {
            main: '#118D57',
        },
        error: {
            main: '#B71D18',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 700,
                    padding: 16,
                    borderRadius: 8,
                    boxShadow: 'none',
                    textTransform: 'none',
                    lineHeight: 1,
                    ":hover": {
                        boxShadow: 'none',
                    }
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
                    borderRadius: 16,
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    padding: 0,
                    minHeight: 24,
                    height: 'auto'
                },
                label: {
                    fontWeight: 700,
                    fontSize: 12,
                    lineHeight: 20 / 12,
                    paddingLeft: 6,
                    paddingRight: 6
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    lineHeight: 22 / 14
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: 14,
                    lineHeight: 22 / 14,
                    fontWeight: 500
                }
            }
        },
        MuiSwitch: {
            styleOverrides: {
            }
        }
    }
})

export const UserInterfaceContext = createContext<Theme | undefined>(undefined)

export const UserInterfaceProvider = ({ children }: PropsWithChildren) => {
    return (
        <UserInterfaceContext.Provider value={theme}>
            <ThemeProvider theme={MUItheme} >
                <ToastProvider>
                    <CssBaseline />
                    {children}
                </ToastProvider>
            </ThemeProvider >
        </UserInterfaceContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(UserInterfaceContext)!

    return context
}