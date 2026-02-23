import MUIBreadcrumbs from '@mui/material/Breadcrumbs';
import type { PropsWithChildren } from 'react';
import type { BaseUserInterfaceProps } from './types';

export const Breadcrumbs = ({ children }: PropsWithChildren<BaseUserInterfaceProps>) => (
    <MUIBreadcrumbs separator=".">{children}</MUIBreadcrumbs>
)