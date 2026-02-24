import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';

import { List } from '@/core/user-interface/list';
import { Avatar } from '@/core/user-interface/avatar';
import { Logo } from '@/core/user-interface/logo';

import { Outlet } from '../routing-provider/outlet';

import { ChevronRightIcon } from '@/core/user-interface/icons/chevron-right';
import { UserIcon } from '@/core/user-interface/icons/user';

import avatarSRC from '@/assets/avatar1.png';
import { useNavigate } from '../routing-provider/use-navigate';
import { useTheme } from './context-provider';
import { Base } from './base';



const drawerWidth = 280;

export const DashboardLayout = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ bgcolor: 'white', boxShadow: 'none', width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: theme.borders.dashed
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Base _css={{ pl: theme => theme.spacing(2), pt: theme => theme.spacing(3), pb: theme => theme.spacing(2) }}>
                    <Logo />
                </Base>
                <List>
                    <List.ListItem>
                        <List.ListItemButton onClick={() => navigate('/')}>
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
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 5,
                    pt: 2,
                    maxWidth: theme => `calc(${theme.spacing(6)} + 1078px)`
                }}>
                <Avatar _css={{ ml: 'auto' }} hasBorder src={avatarSRC} alt='Avatar do usuario atual' />
                <Outlet />
            </Box>
        </Box>
    );
}
