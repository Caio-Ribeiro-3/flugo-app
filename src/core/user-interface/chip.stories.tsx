import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './chip';

const meta: Meta<typeof Chip> = {
    title: 'Components/Chip',
    component: Chip,
    argTypes: {
        color: { control: 'select', options: ['primary', 'success', 'error'] },
        variant: { control: 'select', options: ['filled'] },
    },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Primary: Story = {
    args: {
        children: 'Padrão',
        color: 'primary',
    },
};

export const Success: Story = {
    args: {
        children: 'Concluído',
        color: 'success',
    },
};

export const Error: Story = {
    args: {
        children: 'Falhou',
        color: 'error',
    },
};
