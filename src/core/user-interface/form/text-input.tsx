import React, { memo } from 'react';

import TextField from '@mui/material/TextField';

import type { BaseUserInterfaceProps } from '../types';
import { withFormField } from './with-form-field';


export type TextInputProps = Omit<
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement>, 'color' | 'size'> & {
            label?: string;
        }

/**
 * Componente de entrada de texto (Facade).
 * 
 * Renderiza um input, conforme regras do Design System da empresa.
 * 
 * @example
 * <TextInput 
 *   label="Nome Completo" 
 *   placeholder="Digite seu nome" 
 *   onChange={(e) => console.log(e.target.value)} 
 * />
 */

export const TextInput = memo(withFormField(({
    _css,
    label,
    min,
    max,
    // @ts-ignore
    component,
    ...rest
}: BaseUserInterfaceProps<TextInputProps>) => {
    return (
        <TextField
            label={label}
            multiline={false}
            fullWidth
            sx={_css}
            slotProps={{
                htmlInput: {
                    min,
                    max,
                },
            }}
            {...rest}
        />
    )
}))