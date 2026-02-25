import React, { memo } from 'react';

import TextField from '@mui/material/TextField';

import type { BaseUserInterfaceProps } from '../types';
import { withFormField } from './with-form-field';


export type TextInputProps = {
    label?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement, Element>
    placeholder?: string;
    disabled?: boolean;
    type?: React.HTMLInputTypeAttribute;
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
    value,
    onChange,
    placeholder,
    disabled,
    type
}: BaseUserInterfaceProps<TextInputProps>) => {
    return (
        <TextField
            label={label}
            value={value}
            type={type}
            multiline={false}
            // @ts-ignore : Não usamos textarea no momento
            onChange={e => onChange?.(e)}
            placeholder={placeholder}
            disabled={disabled}
            fullWidth
            sx={_css}
        />
    )
}))