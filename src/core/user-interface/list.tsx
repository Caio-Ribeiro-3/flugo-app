import type { PropsWithChildren } from 'react';

import MUIList from '@mui/material/List';
import MUIListItem from '@mui/material/ListItem';
import MUIListItemButton from '@mui/material/ListItemButton';
import MUIListItemIcon from '@mui/material/ListItemIcon';
import MUIListItemText from '@mui/material/ListItemText';
import type { BaseUserInterfaceProps } from './types';

const List = ({ children }: PropsWithChildren) => {
    return (
        <MUIList>
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
            sx={_css}
        >
            {children}
        </MUIListItemButton>
    )

}

const ListItemIcon = ({ _css, children }: PropsWithChildren<BaseUserInterfaceProps>) => {
    return <MUIListItemIcon
        sx={_css}
    >
        {children}
    </MUIListItemIcon>

}

const ListItemText = ({ children }: PropsWithChildren) => {
    return (
        <MUIListItemText>
            {children}
        </MUIListItemText>
    )

}

List.ListItem = ListItem
List.ListItemButton = ListItemButton
List.ListItemIcon = ListItemIcon
List.ListItemText = ListItemText

export { List }