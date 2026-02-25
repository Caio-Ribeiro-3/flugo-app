import type { HTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';
import MUIChip from '@mui/material/Chip';



/**
 * Interface para as propriedades do componente Chip.
 * Estende os atributos nativos de div e define variantes de status.
 */
export interface ChipProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    /** Define o estilo visual do chip. */
    variant?: 'filled';
    /** Define a paleta de cores semânticas para estados de sucesso, erro ou padrão. */
    color?: 'primary' | 'success' | 'error'
}

/**
 * Componente Chip (Facade).
 * Utilizado para exibir etiquetas, status ou categorias com estilização baseada em tokens de transparência.
 * 
 * @example
 * <Chip color='primary'>
 *  Ativo
 * </Chip>
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