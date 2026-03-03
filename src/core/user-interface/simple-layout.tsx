import { type PropsWithChildren } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

import { Logo } from '@/core/user-interface/logo';

import { useTheme } from './context-provider';
import { useMediaQuery } from './use-media-query';
import { windowBreakpoints } from './constants';



/**
 * Componente de layout principal para a área de Dashboard.
 * 
 * Gerencia a estrutura global da página, incluindo:
 * - Área de conteúdo principal com suporte a renderização de rotas (Outlet).
 * 
 * @example
 * // Utilizado geralmente na definição de rotas principais
 * 
 * <Route element={<SimpleLayout />}>
 *   <Route path="colaboradores" element={<ColaboradoresPage />} />
 * </Route>
 */
export const SimpleLayout = ({ children }: PropsWithChildren) => {
    const theme = useTheme()
    const matches = useMediaQuery(windowWidth => windowWidth > windowBreakpoints.sm);

    return (
        <Box>
            <AppBar
                color='transparent'
                position="fixed"
                sx={{
                    boxShadow: 'none',
                    px: theme => theme.spacing(2),
                    pt: theme => theme.spacing(3),
                    pb: theme => theme.spacing(2),
                    borderBottom: theme.borders.dashed,
                }}
            >
                <Box>
                    <Logo to='/login' />
                </Box>
            </AppBar>
            <Box
                component="main"
                sx={{
                    p: matches ? 5 : 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    width: '100%',
                    minHeight: `100vh`,
                }}>
                {children}
            </Box>
        </Box>
    );
}
