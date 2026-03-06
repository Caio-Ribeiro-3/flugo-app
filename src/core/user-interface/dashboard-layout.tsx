import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';

import { List } from '@/core/user-interface/list';
import { Avatar } from '@/core/user-interface/avatar';
import { Logo } from '@/core/user-interface/logo';

import { ChevronRightIcon } from '@/core/user-interface/icons/chevron-right';
import { UserIcon } from '@/core/user-interface/icons/user';
import { IDENTITY as DEPARTAMENTOS_IDENTITY } from '@/features/departamentos/model'


import avatarSRC from '@/assets/avatar1.png';
import { useNavigate } from '../routing-provider/use-navigate';
import { useTheme } from './context-provider';
import { Base } from './base';
import { MenuIcon } from './icons/menu';
import { useState, type PropsWithChildren } from 'react';
import { CloseIcon } from './icons/close';
import { useMediaQuery } from './use-media-query';
import { windowBreakpoints } from './constants';
import { IconButton } from './button';
import { useApp } from '../app-shell';
import { Menu, MenuCategory } from './menu';
import { useLogout } from '../auth/use-logout';
import { DepartmentIcon } from './icons/department';



const drawerWidth = 280;
/**
 * Componente de layout principal para a área de Dashboard.
 * 
 * Gerencia a estrutura global da página, incluindo:
 * - Drawer (Sidebar) lateral fixa com navegação.
 * - AppBar superior para ações globais.
 * - Área de conteúdo principal com suporte a renderização de rotas (Outlet).
 * - Avatar de usuário persistente.
 * 
 * @example
 * // Utilizado geralmente na definição de rotas principais
 * 
 * <Route element={<DashboardLayout />}>
 *   <Route path="colaboradores" element={<ColaboradoresPage />} />
 * </Route>
 */
export const DashboardLayout = ({ children }: PropsWithChildren) => {
    const app = useApp()
    const matches = useMediaQuery(windowWidth => windowWidth > windowBreakpoints.sm);
    const navigate = useNavigate()
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const { logout } = useLogout()

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ display: matches ? 'flex' : undefined }}>
            <AppBar
                position="fixed"
                sx={{ bgcolor: 'white', boxShadow: 'none', width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
            </AppBar>
            <Drawer
                sx={{
                    // display: { xs: 'none', sm: 'block' },
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: theme.borders.dashed
                    },
                }}
                variant={matches ? "permanent" : "temporary"}
                open={matches || open}
                anchor="left"
                slotProps={matches ? undefined : {
                    root: {
                        keepMounted: true,
                    },
                }}
                onClose={handleDrawerClose}
            >
                <Base _css={{
                    px: theme => theme.spacing(2),
                    pt: theme => theme.spacing(3),
                    pb: theme => theme.spacing(2),
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Logo />
                    {matches ? (
                        <></>
                    ) : open && (
                        <IconButton aria-label='Fechar menu' onClick={() => handleDrawerClose()}>
                            <CloseIcon />
                        </IconButton>
                    )}
                </Base>
                <List>
                    <List.ListItem>
                        <List.ListItemButton
                            onClick={() => {
                                navigate(app.defaultAuthenticatedRoute)
                                handleDrawerClose()
                            }}>
                            <List.ListItemIcon>
                                <UserIcon />
                            </List.ListItemIcon>
                            <List.ListItemText>
                                Colaboradores
                            </List.ListItemText>
                            <List.ListItemIcon _css={{ pr: 1 }}>
                                <ChevronRightIcon size="small" />
                            </List.ListItemIcon>
                        </List.ListItemButton>
                    </List.ListItem>
                    <List.ListItem>
                        <List.ListItemButton
                            onClick={() => {
                                navigate(`/dashboard/${DEPARTAMENTOS_IDENTITY}`)
                                handleDrawerClose()
                            }}>
                            <List.ListItemIcon>
                                <DepartmentIcon />
                            </List.ListItemIcon>
                            <List.ListItemText>
                                Departamentos
                            </List.ListItemText>
                            <List.ListItemIcon _css={{ pr: 1 }}>
                                <ChevronRightIcon size="small" />
                            </List.ListItemIcon>
                        </List.ListItemButton>
                    </List.ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: matches ? 1 : undefined,
                    p: matches ? 5 : 2,
                    pt: 2,
                    maxWidth: theme => `calc(${theme.spacing(6)} + 1078px)`
                }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {!matches && (
                        <IconButton aria-label='Abrir menu' onClick={() => setOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Base _css={{ ml: 'auto' }} >
                        <Menu
                            trigger={() => (
                                <Avatar hasBorder src={avatarSRC} alt='Avatar do usuario atual' />
                            )}
                        >
                            {() => (
                                <MenuCategory title='Acoes'>
                                    <span style={{ cursor: 'pointer' }} onClick={() => logout()}>
                                        Logout
                                    </span>
                                </MenuCategory>
                            )}
                        </Menu>
                    </Base>
                </Box>
                {children}
            </Box>
        </Box>
    );
}
