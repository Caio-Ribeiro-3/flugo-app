import { useState, type MouseEvent, type PropsWithChildren, type ReactNode } from 'react';

import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import MUIMenu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';

const StyledListHeader = Object.assign(
    styled(ListSubheader)({
        backgroundImage: 'var(--Paper-overlay)',
    }),
    {
        // IMPORTANT: The base ListSubheader component sets `muiSkipListHighlight = true`
        // by default, but wrapping it with `styled(ListSubheader)` does not preserve
        // that static field. We re-declare it here so the menu list continues to skip
        // highlighting this non-focusable subheader when navigating with the keyboard.
        muiSkipListHighlight: true,
    },
);

export type MenuProps = {
    trigger: (args: { open: boolean; handleClose(): void }) => ReactNode;
    children: (args: { open: boolean; handleClose(): void }) => ReactNode
}

export function Menu({ trigger, children }: MenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div
                id="basic-div"
                aria-controls={open ? 'grouped-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {trigger({ handleClose, open })}
            </div>
            <MUIMenu
                id="grouped-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                        sx: {
                            p: 2,
                        },
                    },
                }}
            >
                {children({ handleClose, open })}
            </MUIMenu>
        </div>
    );
}

export const MenuCategory = ({ title, children }: PropsWithChildren<{ title: string; }>) => {
    return (
        <div>
            <StyledListHeader>
                {title}
            </StyledListHeader>
            {children}
        </div>
    )
}

