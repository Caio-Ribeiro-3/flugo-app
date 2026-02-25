import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, Option } from './select';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
    title: 'Components/Select',
    component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
    render: () => {
        const [val, setVal] = useState('1');
        return (
            <div style={{ width: 300 }}>
                <Select
                    label="Selecione um nível"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                >
                    <Option value="1">Júnior</Option>
                    <Option value="2">Pleno</Option>
                    <Option value="3">Sênior</Option>
                </Select>
            </div>
        );
    }
};

export const Disabled: Story = {
    args: {
        label: 'Campo Desabilitado',
        disabled: true,
        value: '',
        children: <Option value="1">Não selecionável</Option>
    }
};

export const ErrorState: Story = {
    args: {
        label: 'Campo com Erro',
        error: 'Um erro'
    },
    render: (args) => (
        <div style={{ width: 300 }}>
            <Select {...args}>
                <Option value="1">Opção A</Option>
                <Option value="2">Opção B</Option>
            </Select>
        </div>
    )
};
