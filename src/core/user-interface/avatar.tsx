import type { HTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';
import MUIAvatar from '@mui/material/Avatar';
import type { BaseUserInterfaceProps } from './types';



/**
 * Interface para as propriedades do componente Avatar.
 */
export interface AvatarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, BaseUserInterfaceProps {
    /** URL da imagem a ser exibida */
    src?: string;
    /** Texto alternativo para acessibilidade e fallback */
    alt?: string;
    /** Se verdadeiro, adiciona uma borda dupla estilizada ao redor do avatar */
    hasBorder?: boolean;
}

/**
 * Componente de Avatar customizado.
 * Atua como um facade para exibição de fotos de perfil ou iniciais.
 * 
 * @example
 * <Avatar src="url-da-foto.jpg" alt="João Silva" hasBorder />
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
