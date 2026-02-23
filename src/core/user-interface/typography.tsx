import type { HTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';
import MUITypography from '@mui/material/Typography';
import type { BaseUserInterfaceProps } from './types';

export interface TypographyProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    variant?: 'h1' | 'h4' | 'body1';
    component?: string;
    color?: 'text.primary' | 'text.secondary'
}
/**
 * @component Typography
 * @description 
 * Esta é uma **Facade** para o componente de botão da biblioteca externa (MUI).
 * 
 * **Propósito:**
 * 1. Padronizar a interface de botões no projeto.
 * 2. Isolar a dependência externa (facilita trocas futuras de biblioteca).
 * 3. Simplificar as propriedades, expondo apenas o necessário para o design system local.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {'h1'} [props.variant='h1'] - Define o estilo visual seguindo os tokens da empresa.
 * @param {React.ReactNode} props.children - Conteúdo textual ou elementos internos do botão.
 * 
 * @example
 * <Typography variant="h1">
 *   Lorem Ipsum
 * </Typography>
 */
const Typography = ({
    _css,
    variant = 'h1',
    component,
    color = 'text.primary',
    ...rest
}: PropsWithChildren<BaseUserInterfaceProps<TypographyProps>>) => {
    return (
        <MUITypography
            component={(component || variant)}
            variant={variant}
            color={color === 'text.primary' ? 'textPrimary' : color === 'text.secondary' ? 'textSecondary' : undefined}
            sx={_css}
            {...rest}
        />
    )
}

const Body2 = (props: PropsWithChildren<BaseUserInterfaceProps<TypographyProps>>) => (
    <Typography color='text.primary' {...props} _css={{ fontSize: 14, fontWeight: 400, ...props._css }} />
)

Typography.Body2 = Body2

export { Typography }

