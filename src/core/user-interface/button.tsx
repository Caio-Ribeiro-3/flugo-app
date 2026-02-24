import type { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';
import MUIButton from '@mui/material/Button';
import MUIIconButton from '@mui/material/IconButton';
import { useTheme } from './context-provider';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'primary' | 'neutral'
    size?: 'large'
}
/**
 * @component Button
 * @description 
 * Esta é uma **Facade** para o componente de Button da biblioteca externa (MUI).
 * 
 * **Propósito:**
 * 1. Padronizar a interface de botões no projeto.
 * 2. Isolar a dependência externa (facilita trocas futuras de biblioteca).
 * 3. Simplificar as propriedades, expondo apenas o necessário para o design system local.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {'primary' | 'secondary' | 'danger'} [props.variant='primary'] - Define o estilo visual seguindo os tokens da empresa.
 * @param {boolean} [props.isLoading=false] - Controla o estado de carregamento e desabilita o clique.
 * @param {React.ReactNode} props.children - Conteúdo textual ou elementos internos do botão.
 * @param {function} props.onClick - Handler de clique traduzido para o padrão do projeto.
 * 
 * @example
 * <Button variant="primary" onClick={handleOnClick}>
 *   Salvar Alterações
 * </Button>
 */
export const Button = ({
    variant = 'contained',
    color = 'primary',
    size = 'large',
    ...rest
}: PropsWithChildren<ButtonProps>) => {
    const theme = useTheme()
    const finalColor = variant === 'contained' ? 'white' : color === 'neutral' ? theme.palette.text.primary : theme.palette.primary.main
    return (
        <MUIButton
            sx={{
                fontWeight: 700,
                px: 2,
                py: 0,
                minHeight: theme.spacing(6),
                minWidth: theme.spacing(8),
                borderRadius: 1,
                boxShadow: 'none',
                textTransform: 'none',
                lineHeight: 26 / 15,
                fontSize: 15,
                ":hover": {
                    boxShadow: 'none',
                    bgcolor: color === 'neutral' ? theme.palette.divider : undefined
                },
                color: finalColor,
            }}
            variant={variant}
            {...rest}
        />
    )
}


/**
 * @component IconButton
 * @description 
 * Esta é uma **Facade** para o componente de IconButton da biblioteca externa (MUI).
 * 
 * **Propósito:**
 * 1. Padronizar a interface de botões no projeto.
 * 2. Isolar a dependência externa (facilita trocas futuras de biblioteca).
 * 3. Simplificar as propriedades, expondo apenas o necessário para o design system local.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {'primary' | 'secondary' | 'danger'} [props.variant='primary'] - Define o estilo visual seguindo os tokens da empresa.
 * @param {boolean} [props.isLoading=false] - Controla o estado de carregamento e desabilita o clique.
 * @param {React.ReactNode} props.children - Conteúdo textual ou elementos internos do botão.
 * @param {function} props.onClick - Handler de clique traduzido para o padrão do projeto.
 * 
 * @example
 * <IconButton>
 *   <Icon />
 * </IconButton>
 */
export const IconButton = ({
    color,
    ...rest
}: PropsWithChildren<Omit<ButtonProps, 'variant'>>) => {
    return (
        <MUIIconButton
            color={color}
            {...rest}
        />
    )
}