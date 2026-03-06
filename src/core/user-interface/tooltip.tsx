import type { ReactElement } from 'react';

import MUITooltip from '@mui/material/Tooltip';

import type { BaseUserInterfaceProps } from './types';



interface TooltipProps {
    title: string;
    children: ReactElement<unknown, any>
}

export const Tooltip = ({ title, children }: BaseUserInterfaceProps<TooltipProps>) => (
    <MUITooltip title={title}>
        <div>
            {children}
        </div>
    </MUITooltip>
)