import { memo, type PropsWithChildren } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MUISelect from "@mui/material/Select";
import MUIMenuItem from "@mui/material/MenuItem";

import type { BaseUserInterfaceProps } from "../types";
import { ChevronRightIcon } from "../icons/chevron-right";
import { withFormField } from "./with-form-field";

type SelectProps = {
    /** Label para o campo */
    label?: string;
    /** Callback para evento onchange */
    onChange?: (event: React.ChangeEvent<Omit<HTMLInputElement, 'value'> & {
        value: string;
    }>) => void;
    /** Desabilitar/habilitar campo */
    disabled?: boolean;
    /** Desabilitar/habilitar campo */
} & ({ multiple: true; value: string[] } | { multiple?: false; value?: string })

/**
 * Componente de seleção (Facade) com suporte a campos de formulário.
 * 
 * Padroniza o visual do Select do Material UI, injetando um ícone customizado
 * e utilizando o HOC `withFormField` para gerenciamento de estados de erro/label.
 * 
 * @example
 * <Select label="Cargo" value={value} onChange={handleChange}>
 *   <Select.Option value="admin">Administrador</Select.Option>
 *   <Select.Option value="user">Usuário Comum</Select.Option>
 * </Select>
 */
const Select = memo(withFormField(({
    label,
    children,
    onChange,
    disabled,
    value,
    multiple
}: PropsWithChildren<BaseUserInterfaceProps<SelectProps>>) => (
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <MUISelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            // @ts-ignore : Nao precisamos dos overloads no momento
            onChange={e => onChange?.(e as React.ChangeEvent<Omit<HTMLInputElement, 'value'> & {
                value: string;
            }>)}
            disabled={disabled}
            IconComponent={() => (
                <ChevronRightIcon _css={{ mr: 1, transform: 'rotate(90deg)' }} size="small" />
            )}
            multiple={multiple}
        >
            {children}
        </MUISelect>
    </FormControl>
)))

interface MenuItemProps {
    value?: string
}

const Option = ({ _css, ...rest }: PropsWithChildren<BaseUserInterfaceProps<MenuItemProps>>) => (
    <MUIMenuItem {...rest} sx={_css} />
)

export { Select, Option }