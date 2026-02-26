import { createContext, useContext, type PropsWithChildren } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import type { Theme } from './types';
import { ToastProvider } from './toast';



const MUItheme = createTheme({
    typography: {
        fontFamily: theme.typography.fontFamily,
    },
    palette: {
        primary: {
            main: theme.palette.primary.main
        },
        text: {
            primary: theme.palette.text.primary,
            secondary: theme.palette.text.secondary
        },
        divider: theme.palette.divider,
        success: {
            main: theme.palette.success.main,
        },
        error: {
            main: theme.palette.error.main,
        },
    },
    components: {
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
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: 'rgba(145, 158, 171, .2)'
                }
            }
        }
    }
})

const UserInterfaceContext = createContext<Theme | undefined>(undefined)
/**
 * Provedor central da interface de usuário (Design System Facade).
 * 
 * Este componente unifica o estilo de dependencias externas e o contexto de tema customizado da aplicação.
 * 
 * @example
 * // Envolva a raiz da aplicação ou o decorator do Storybook:
 * <UserInterfaceProvider>
 *   <App />
 * </UserInterfaceProvider>
 * 
 * // Para consumir o tema customizado em qualquer componente:
 * const theme = useTheme();
 */
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