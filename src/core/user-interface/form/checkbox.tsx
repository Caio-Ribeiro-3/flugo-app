import MUICheckbox from '@mui/material/Checkbox';

import { withFormField } from "./with-form-field"
import type { BaseUserInterfaceProps } from '../types';


interface CheckboxProps {
    value?: boolean;
    onChange?(): void
}

export const Checkbox = withFormField(({
    value,
    onChange,
    _css
}: BaseUserInterfaceProps<CheckboxProps>) => {
    return (
        <MUICheckbox
            checked={value}
            onChange={onChange}
            sx={_css}
            disableRipple
        />
    )
})