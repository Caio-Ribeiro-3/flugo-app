import { memo, type DetailedHTMLProps, type InputHTMLAttributes } from 'react';

import TextField from '@mui/material/TextField';

import type { BaseUserInterfaceProps } from '../types';
import { withFormField } from './with-form-field';


export interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
}

export const TextInput = memo(withFormField((props: BaseUserInterfaceProps<TextInputProps>) => {
    return (
        <TextField fullWidth {...props} />
    )
}))