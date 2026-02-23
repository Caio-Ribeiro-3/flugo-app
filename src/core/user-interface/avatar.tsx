import type { HTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';
import MUIAvatar from '@mui/material/Avatar';
import type { BaseUserInterfaceProps } from './types';

export interface AvatarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, BaseUserInterfaceProps {
    src?: string;
    alt?: string;
    hasBorder?: boolean;
}
/**
 * @component Avatar
 * @description 
 * Esta é uma **Facade** para o componente de Avatar da biblioteca externa (MUI).
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
 * <Avatar />
 */
export const Avatar = ({
    src,
    alt,
    hasBorder,
    _css,
}: PropsWithChildren<AvatarProps>) => {
    return (
        <MUIAvatar
            alt={alt}
            sx={{
                ...(hasBorder && {
                    border: hasBorder ? '2px solid #fff' : undefined,
                    outline: hasBorder ? '2px solid rgba(145, 158, 171, 0.08)' : undefined,
                }),
                ..._css,
            }}
            src={src}
        />
    )
}
