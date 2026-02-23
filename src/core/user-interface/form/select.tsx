import type { ChangeEvent, PropsWithChildren } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MUISelect from "@mui/material/Select";
import MUIMenuItem from "@mui/material/MenuItem";

import type { BaseUserInterfaceProps } from "../types";

interface SelectProps {
    label?: string;
    value?: string;
    onChange?(event: ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string; }, Element>): void
    disabled?: boolean;
}

const Select = ({
    label,
    children,
    onChange,
    disabled,
    value,
    ...rest
}: PropsWithChildren<BaseUserInterfaceProps<SelectProps>>) => (
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <MUISelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            onChange={onChange}
            disabled={disabled}
        >
            {children}
        </MUISelect>
    </FormControl>
)

interface MenuItemProps {
    value?: string
}

const MenuItem = ({ _css, ...rest }: PropsWithChildren<BaseUserInterfaceProps<MenuItemProps>>) => (
    <MUIMenuItem {...rest} sx={_css} />
)

Select.MenuItem = MenuItem

export { Select }