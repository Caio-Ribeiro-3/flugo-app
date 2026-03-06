import { memo, type PropsWithChildren } from "react";

import { Box } from "@mui/material";

import type { BaseUserInterfaceProps } from "./types";



/**
 * Componente estrutural base (Primitivo).
 * 
 * Atua como a camada de abstração mais baixa do Design System, fornecendo um container
 * agnóstico que traduz a interface universal de estilização para a biblioteca de UI interna.
 * 
 * Este objeto permite a 
 * definição de estilos que podem ser convertidos para diferentes engines (Material UI, 
 * CSS-in-JS, CSS Modules, etc), garantindo a portabilidade da codebase.
 * 
 * @example
 * <Base _css={{display: 'flex'}}>
 *      <button>Clique aqui!</button>
 * </Base>
 */
export const Base = memo(({
    children,
    _css,
    component
}: PropsWithChildren<BaseUserInterfaceProps>) => {
    return (
        <Box
            sx={_css}
            // @ts-expect-error : Tipagem do MUI
            component={component}
        >
            {children}
        </Box>
    )
})