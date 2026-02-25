import { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: { control: 'select', options: ['contained', 'outlined', 'text'] },
        color: { control: 'select', options: ['primary', 'neutral'] },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Teste de Renderização e Estilo Base
 */
export const Contained: Story = {
    args: {
        variant: 'contained',
        color: 'primary',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        // Valida se o texto está correto
        await expect(button).toBeInTheDocument();

        // Valida a cor via estilo computado (confirmação do Facade)
        // Nota: Em testes de browser real, ele pegará o valor exato (ex: rgb(255, 255, 255))
        await expect(button).toHaveStyle({ color: 'rgb(255, 255, 255)' });
    },
};

/**
 * Teste de Interação (Simulação de Clique)
 */
export const Interaction: Story = {
    args: {
        children: 'Botão Interativo',
    },
    play: async ({ args, canvasElement, }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        // Simula o clique do usuário
        await userEvent.click(button);

        // Valida se a função mockada foi chamada
        await expect(args.onClick).toHaveBeenCalled();
    },
};

/**
 * Teste de Estado Desabilitado
 */
export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Não clique',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        await expect(button).toBeDisabled();
    },
};