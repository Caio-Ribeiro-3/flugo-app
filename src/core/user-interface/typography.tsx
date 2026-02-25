import { memo, type PropsWithChildren } from 'react';
import MUITypography from '@mui/material/Typography';
import type { BaseUserInterfaceProps } from './types';
import { useTheme } from './context-provider';



export interface TypographyProps {
    variant?: 'body1' | 'nav-item-default' | 'desktop-h4' | 'table-head' | 'body2' | 'subtitle2' | 'caption';
    component?: string;
    color?: 'text.primary' | 'text.secondary'
    disabled?: boolean;
}

/**
 * Componente de Tipografia (Facade).
 * 
 * Centraliza as definições de texto do projeto, mapeando variantes de design 
 * para estilos CSS específicos (fontSize, fontWeight, lineHeight).
 * 
 * @example
 * <Typography variant="desktop-h4" color="text.primary">
 *   Título da Página
 * </Typography>
 * 
 * @example
 * <Typography variant="nav-item-default" disabled>
 *   Menu Lateral
 * </Typography>
 */
export const Typography = memo(({
    _css,
    variant = 'body2',
    component = 'div',
    color,
    disabled,
    ...rest
}: PropsWithChildren<BaseUserInterfaceProps<TypographyProps>>) => {
    const theme = useTheme()
    const finalStyles: any = {}
    if (variant === 'nav-item-default') {
        finalStyles.color = 'text.secondary'
        finalStyles.fontSize = 14
        finalStyles.lineHeight = 22 / finalStyles.fontSize
        finalStyles.fontWeight = 500
    } else if (variant === 'desktop-h4') {
        finalStyles.color = 'text.primary'
        finalStyles.fontSize = 24
        finalStyles.lineHeight = 36 / finalStyles.fontSize
        finalStyles.fontWeight = 700
    } else if (variant === 'table-head') {
        finalStyles.color = 'text.secondary'
        finalStyles.fontSize = 14
        finalStyles.lineHeight = 24 / finalStyles.fontSize
        finalStyles.fontWeight = 600
    } else if (variant === 'body2') {
        finalStyles.color = 'text.primary'
        finalStyles.fontSize = 14
        finalStyles.lineHeight = 22 / finalStyles.fontSize
        finalStyles.fontWeight = 400
    } else if (variant === 'subtitle2') {
        finalStyles.color = 'text.primary'
        finalStyles.fontSize = 14
        finalStyles.lineHeight = 22 / finalStyles.fontSize
        finalStyles.fontWeight = 600
    } else if (variant === 'caption') {
        finalStyles.color = 'text.secondary'
        finalStyles.fontSize = 12
        finalStyles.lineHeight = 18 / finalStyles.fontSize
        finalStyles.fontWeight = 400
    }


    finalStyles.color = color || finalStyles.color

    if (disabled) {
        finalStyles.color = theme.palette.text.disabled
    }
    return (
        <MUITypography
            component={component as React.ElementType<any, keyof React.JSX.IntrinsicElements>}
            sx={{ ...finalStyles, ..._css }}
            {...rest}
        />
    )
})