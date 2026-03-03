import type { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';

import MUIButton from '@mui/material/Button';

import { useTheme } from './context-provider';
import type { BaseUserInterfaceProps } from './types';



/**
 * Interface que define o contrato do botão da nossa Design System.
 * Estende os atributos nativos do botão HTML.
 */
export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    /** Define o estilo visual do botão */
    variant?: 'contained' | 'outlined' | 'text';
    /** Define a paleta de cores aplicada */
    color?: 'primary' | 'neutral'
}

/**
 * Componente core de botão.
 * Atua como um facade para padronizar a interação visual e comportamental em toda a codebase.
 * 
 * @example
 * <Button variant="contained" color="primary" onClick={() => {}}>
 *   Clique aqui
 * </Button>
 */
export const Button = ({
    variant = 'contained',
    color = 'primary',
    _css,
    ...rest
}: PropsWithChildren<BaseUserInterfaceProps<ButtonProps>>) => {
    const theme = useTheme()
    const finalColor = variant === 'contained' ? 'white' : color === 'neutral' ? theme.palette.text.primary : theme.palette.primary.main
    const fontSize = 15
    return (
        <MUIButton
            sx={{
                fontWeight: 700,
                px: 2,
                py: 0,
                minHeight: theme.spacing(6),
                minWidth: theme.spacing(8),
                borderRadius: theme.spacing(1),
                boxShadow: 'none',
                textTransform: 'none',
                fontSize: fontSize,
                lineHeight: 26 / fontSize,
                ":hover": {
                    boxShadow: 'none',
                    bgcolor: color === 'neutral' ? theme.palette.divider : undefined
                },
                color: finalColor,
                ..._css
            }}
            variant={variant}
            {...rest}
        />
    )
}