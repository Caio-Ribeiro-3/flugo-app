import { memo } from 'react';

import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { withFormField } from './with-form-field';
import type { BaseUserInterfaceProps } from '../types';



interface DateInputProps extends Omit<
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement>, 'value' | 'onChange' | 'defaultValue' | 'onError'> {
    label?: string;
    value?: Date;
    onChange?(newDate?: Date): void;
}

export const DateInput = memo(withFormField(({ label, value, onChange, _css, ...rest }: BaseUserInterfaceProps<DateInputProps>) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                sx={{ width: '100%', ..._css }}
                value={dayjs(value)}
                label={label}
                onChange={newValue => {
                    onChange?.(newValue?.toDate())
                }}
                {...rest}
            />
        </LocalizationProvider>
    )
}))