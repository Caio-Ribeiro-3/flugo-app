import MUISwitch, { type SwitchProps as MUISwitchProps } from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import { styled } from '@mui/material/styles';

import type { BaseUserInterfaceProps } from '../types'
import { theme as appTheme } from '../theme'
import { Typography } from '../typography';
import type { SyntheticEvent } from 'react';

const CustomSwitch = styled((props: MUISwitchProps) => (
    <MUISwitch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 33,
    height: 20,
    padding: 0,
    marginRight: appTheme.spacing(1),
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        '&.Mui-checked': {
            transform: 'translateX(13px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: appTheme.palette.primary.main,
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 14,
        height: 14,
        boxShadow: 'none',
        transform: 'translateY(1px)',
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export interface SwitchProps {
    label?: string;
    onChange?: (event: SyntheticEvent<Element, Event>) => void
}

/**
 * Componente de Switch (Facade).
 * 
 * 
 * @example
 * <Switch 
 *   label="Ativar notificações" 
 *   onChange={(e) => console.log(e.target.checked)} 
 * />
 */
export const Switch = ({
    label,
    _css,
    onChange,
    ...rest
}: BaseUserInterfaceProps<SwitchProps>) => (
    <FormControlLabel
        sx={{ margin: 0, ..._css }}
        onChange={e => onChange?.(e)}
        control={(
            <CustomSwitch
                {...rest}
                defaultChecked
            />
        )}
        label={<Typography variant='body2'>{label}</Typography>}
    />
)