import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import TextField from '@mui/material/TextField';

import type { BaseUserInterfaceProps } from '../types';


export interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
}

export const TextInput = (props: BaseUserInterfaceProps<TextInputProps>) => {
    return (
        <TextField fullWidth {...props} />
    )
}