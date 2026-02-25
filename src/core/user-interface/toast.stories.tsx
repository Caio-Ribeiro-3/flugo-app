import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './toast';
import { Button } from './button';

const meta: Meta<typeof ToastProvider> = {
    title: 'Services/Toast',
    component: ToastProvider,
};

export default meta;

const ToastDemo = () => {
    const notify = useToast();
    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <Button
                onClick={() => notify({ variant: 'success', message: 'Item salvo com sucesso!' })}
            >
                Sucesso
            </Button>
            <Button
                variant="outlined"
                color="neutral"
                onClick={() => notify({ variant: 'error', message: 'Erro ao processar requisição.' })}
            >
                Erro
            </Button>
        </div>
    );
};

export const Default: StoryObj = {
    render: () => (
        <ToastProvider>
            <ToastDemo />
        </ToastProvider>
    ),
};
