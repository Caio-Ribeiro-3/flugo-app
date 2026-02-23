import type { HTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';
import MUIChip from '@mui/material/Chip';

export interface ChipProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    variant?: 'filled' | 'outlined';
    color?: 'primary' | 'success' | 'error'
}
/**
 * @component Chip
 * @description 
 * Esta é uma **Facade** para o componente de Chip da biblioteca externa (MUI).
 * 
 * **Propósito:**
 * 1. Padronizar a interface de botões no projeto.
 * 2. Isolar a dependência externa (facilita trocas futuras de biblioteca).
 * 3. Simplificar as propriedades, expondo apenas o necessário para o design system local.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {'primary' | 'secondary' | 'danger'} [props.variant='primary'] - Define o estilo visual seguindo os tokens da empresa.
 * @param {function} props.onClick - Handler de clique traduzido para o padrão do projeto.
 * 
 * @example
 * <Chip>Meu Chip</Chip>
 */
export const Chip = ({
    variant = 'filled',
    color = 'primary',
    children,
    ...rest
}: PropsWithChildren<ChipProps>) => {
    return (
        <MUIChip
            variant={variant}
            sx={color === 'success' ? {
                bgcolor: 'rgba(34, 197, 94, 0.16)',
                color: theme => theme.palette.success.main
            } : color === 'error' ? {
                bgcolor: 'rgba(255, 86, 48, 0.16)',
                color: theme => theme.palette.error.main
            } : {

            }}
            label={children}
            {...rest}
        />
    )
}