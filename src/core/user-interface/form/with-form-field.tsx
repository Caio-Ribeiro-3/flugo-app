import FormHelperText from '@mui/material/FormHelperText';
import type { ReactNode } from 'react';

export function withFormField<T>(Component: (props: T) => ReactNode) {
    return function ({ error, ...rest }: T & { error?: string; }) {
        return (
            <div>
                <Component {...rest} />
                <FormHelperText error={!!error} >
                    {error}
                </FormHelperText>
            </div>
        )
    }
}