import type { PropsWithChildren } from 'react';

import MUIBreadcrumbs from '@mui/material/Breadcrumbs';

import dotSRC from '@/assets/dot.svg';

import type { BaseUserInterfaceProps } from './types';
import { useTheme } from './context-provider';



export const Breadcrumbs = ({ children }: PropsWithChildren<BaseUserInterfaceProps>) => {
    const theme = useTheme()
    return (
        <MUIBreadcrumbs separator={<img src={dotSRC} style={{ marginRight: theme.DEFAULT_SPACING, marginLeft: theme.DEFAULT_SPACING }} />}>{children}</MUIBreadcrumbs>
    )
}