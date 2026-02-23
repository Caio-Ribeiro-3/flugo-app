import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { List } from '@/core/user-interface/list';
import { Avatar } from '@/core/user-interface/avatar';
import { Logo } from '@/core/user-interface/logo';

import { Outlet } from '../routing-provider/outlet';

import { ChevronRightIcon } from '@/core/user-interface/icons/chevron-right';
import { UserIcon } from '@/core/user-interface/icons/user';

import avatarSRC from '@/assets/avatar1.png';
import { useNavigate } from '../routing-provider/use-navigate';



const drawerWidth = 280;

export const DashboardLayout = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ bgcolor: 'white', boxShadow: 'none', width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Avatar hasBorder src={avatarSRC} alt='Avatar do usuario atual' />
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: '1px dashed rgba(145, 158, 171, 0.2)'
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    <Logo />
                </Toolbar>
                <List>
                    <List.ListItem>
                        <List.ListItemButton onClick={() => navigate('/')}>
                            <List.ListItemIcon>
                                <UserIcon />
                            </List.ListItemIcon>
                            <List.ListItemText>
                                Colaboradores
                            </List.ListItemText>
                            <List.ListItemIcon _css={{ ml: 'auto' }}>
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
                    p: 3,
                    pt: (theme) => `${theme.mixins.toolbar.minHeight}px`,
                    maxWidth: theme => `calc(${theme.spacing(6)} + 1078px)`
                }} >
                <Outlet />
            </Box>
        </Box>
    );
}
