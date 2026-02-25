import MUISkeleton from '@mui/material/Skeleton'
import type { BaseUserInterfaceProps } from './types'
import { memo } from 'react';



interface SkeletonProps {
    variant?: 'rectangular' | 'circular';
    height?: number;
    width?: number;
}
/**
 * Componente de carregamento progressivo (Skeleton).
 * 
 * Utilizado para criar placeholders visuais que mimetizam o layout final 
 * enquanto o conteúdo real está sendo carregado.
 * 
 * @example
 * // Skeleton para um Avatar circular
 * <Skeleton variant="circular" width={40} height={40} />
 * 
 * // Skeleton para uma linha de texto
 * <Skeleton variant="rectangular" height={20} _css={{ borderRadius: 1 }} />
 */
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