import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './switch';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
    title: 'Components/Switch',
    component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
    args: {
        label: 'Configuração Ativa',
    },
};

export const Controlled: Story = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return (
            <Switch
                label={checked ? 'Ligado' : 'Desligado'}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
        );
    }
};

export const Disabled: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Switch label="Desabilitado Ativo" disabled defaultChecked />
            <Switch label="Desabilitado Inativo" disabled defaultChecked={false} />
        </div>
    )
};
