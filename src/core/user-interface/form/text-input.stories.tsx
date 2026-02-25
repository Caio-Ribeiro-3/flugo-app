import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput } from './text-input';

const meta: Meta<typeof TextInput> = {
    title: 'Components/TextInput',
    component: TextInput,
    argTypes: {
        disabled: { control: 'boolean' },
        label: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
    args: {
        label: 'Usuário',
        placeholder: 'Digite seu nome de usuário',
    },
};

export const Password: Story = {
    args: {
        label: 'Senha',
        type: 'password',
        placeholder: '********',
    },
};

export const WithError: Story = {
    args: {
        label: 'E-mail',
        error: 'Por favor, insira um e-mail válido.',
    },
};
