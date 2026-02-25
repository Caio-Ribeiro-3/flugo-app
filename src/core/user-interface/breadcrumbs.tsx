import type { PropsWithChildren } from 'react';

import MUIBreadcrumbs from '@mui/material/Breadcrumbs';

import dotSRC from '@/assets/dot.svg';

import type { BaseUserInterfaceProps } from './types';
import { useTheme } from './context-provider';


/**
 * Componente de navegação secundária (Breadcrumbs).
 * 
 * Fornece uma trilha de navegação estilizada com um separador customizado (dot).
 * Atua como um facade para padronizar o espaçamento e ícones de separação
 * em toda a aplicação.
 * 
 * 
 * @example
 * <Breadcrumbs>
 *   <Typography>Home</Typography>
 *   <Typography>Perfil</Typography>
 * </Breadcrumbs>
 */
export const Breadcrumbs = ({ children }: PropsWithChildren<BaseUserInterfaceProps>) => {
    const theme = useTheme()
    return (
        <MUIBreadcrumbs separator={<img role='presentation' src={dotSRC} style={{ marginRight: theme.DEFAULT_SPACING, marginLeft: theme.DEFAULT_SPACING }} />}>{children}</MUIBreadcrumbs>
    )
}