import { describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from '../../test-utils';
import { ToastProvider, useToast } from './toast';

const TestTrigger = () => {
    const notify = useToast();
    return <button onClick={() => notify({ variant: 'success', message: 'Toast Ativo' })}>Disparar</button>;
};

describe('Toast System', () => {
    it('deve exibir a mensagem de sucesso ao clicar no botão', async () => {
        const { getByText } = await render(
            <ToastProvider>
                <TestTrigger />
            </ToastProvider>
        );

        await vi.waitFor(async () => {
            await userEvent.click(getByText('Disparar'));
            const toast = getByText('Toast Ativo');
            await expect.element(toast).toBeVisible();
        })

    });

    it('deve remover o toast após o fechamento', async () => {
        const { getByText, getByRole } = await render(
            <ToastProvider>
                <TestTrigger />
            </ToastProvider>
        );

        await vi.waitFor(async () => {
            await userEvent.click(getByText('Disparar'));
            const closeButton = getByRole('button', { name: /close/i });
            await userEvent.click(closeButton);

            await expect.element(getByText('Toast Ativo')).not.toBeInTheDocument();
        })
    });
});
