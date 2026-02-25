import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './select';
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
                    <Select.Option value="1">Júnior</Select.Option>
                    <Select.Option value="2">Pleno</Select.Option>
                    <Select.Option value="3">Sênior</Select.Option>
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
        children: <Select.Option value="1">Não selecionável</Select.Option>
    }
};

export const ErrorState: Story = {
    args: {
        label: 'Campo com Erro',
        // Nota: Se withFormField injetar props de erro, você as testaria aqui
        _css: { '& .MuiOutlinedInput-notchedOutline': { borderColor: 'error.main' } }
    },
    render: (args) => (
        <div style={{ width: 300 }}>
            <Select {...args}>
                <Select.Option value="1">Opção A</Select.Option>
                <Select.Option value="2">Opção B</Select.Option>
            </Select>
        </div>
    )
};
