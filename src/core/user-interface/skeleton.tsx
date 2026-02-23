import MUISkeleton from '@mui/material/Skeleton'
import type { BaseUserInterfaceProps } from './types'
import { memo } from 'react';

interface SkeletonProps {
    variant?: 'rectangular' | 'circular';
    height?: number;
    width?: number;
}

export const Skeleton = memo(({
    variant = 'rectangular',
    height,
    width,
    _css
}: BaseUserInterfaceProps<SkeletonProps>) => (
    <MUISkeleton
        variant={variant}
        height={height}
        width={width}
        sx={_css}
    />
))