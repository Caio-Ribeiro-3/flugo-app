import type { HTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';
import MUIBadge from '@mui/material/Badge';

export interface BadgeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    variant?: 'contained' | 'outline' | 'text';
    color?: 'primary'
}
/**
 * @component Badge
 * @description 
 * Esta é uma **Facade** para o componente de Badge da biblioteca externa (MUI).
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
 * <Badge />
 */
export const Badge = ({
    ...rest
}: PropsWithChildren<BadgeProps>) => {
    return (
        <MUIBadge

            {...rest}
        />
    )
}