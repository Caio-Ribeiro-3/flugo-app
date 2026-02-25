import { describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from '../../../test-utils';
import { Switch } from './switch';

describe('Switch Component', () => {
    it('deve renderizar o label corretamente', async () => {
        const { getByText } = await render(<Switch label="Ativar Recurso" />);
        expect(getByText('Ativar Recurso')).toBeDefined();
    });

    it('deve alternar o estado ao ser clicado', async () => {
        const handleChange = vi.fn();
        const { getByRole } = await render(
            <Switch label="Toggle" onChange={handleChange} />
        );

        const checkbox = getByRole('switch');

        await userEvent.click(checkbox);

        expect(handleChange).toHaveBeenCalled();
    });

    it('nao deve vir marcado por padrão', async () => {
        const { getByRole } = await render(<Switch label="Padrão" />);
        const checkbox = getByRole('switch').element() as HTMLInputElement;

        expect(checkbox.checked).toBe(false);
    });
});
