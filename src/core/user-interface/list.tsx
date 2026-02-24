import type { PropsWithChildren } from 'react';

import MUIList from '@mui/material/List';
import MUIListItem from '@mui/material/ListItem';
import MUIListItemButton from '@mui/material/ListItemButton';
import MUIListItemIcon from '@mui/material/ListItemIcon';
import MUIListItemText from '@mui/material/ListItemText';
import type { BaseUserInterfaceProps } from './types';
import { Typography } from './typography';

const List = ({ children }: PropsWithChildren) => {
    return (
        <MUIList sx={{ py: 0 }}>
            {children}
        </MUIList>
    )
}

const ListItem = ({ children }: PropsWithChildren) => {
    return (
        <MUIListItem disablePadding>
            {children}
        </MUIListItem>
    )

}

type ListItemButtonProps = {
    onClick?(): void
}


const ListItemButton = ({
    onClick,
    _css,
    children
}: PropsWithChildren<BaseUserInterfaceProps<ListItemButtonProps>>) => {
    return (
        <MUIListItemButton
            onClick={onClick}
            sx={{ gap: 2, ..._css }}
        >
            {children}
        </MUIListItemButton>
    )

}

const ListItemIcon = ({ _css, children }: PropsWithChildren<BaseUserInterfaceProps>) => {
    return (
        <MUIListItemIcon
            sx={{ minWidth: 'auto', ..._css }}
        >
            {children}
        </MUIListItemIcon>
    )
}

const ListItemText = ({ children }: PropsWithChildren) => {
    return (
        <MUIListItemText>
            <Typography variant='nav-item-default'>
                {children}
            </Typography>
        </MUIListItemText>
    )

}

List.ListItem = ListItem
List.ListItemButton = ListItemButton
List.ListItemIcon = ListItemIcon
List.ListItemText = ListItemText

export { List }