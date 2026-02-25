import { memo, type DetailedHTMLProps, type InputHTMLAttributes } from 'react';

import TextField from '@mui/material/TextField';

import type { BaseUserInterfaceProps } from '../types';
import { withFormField } from './with-form-field';


export interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
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

export const TextInput = memo(withFormField((props: BaseUserInterfaceProps<TextInputProps>) => {
    return (
        <TextField fullWidth {...props} />
    )
}))