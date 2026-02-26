import { describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from '../../../test-utils';
import { TextInput } from './text-input';

describe('TextInput Component', () => {
    it('deve renderizar o label e o placeholder corretamente', async () => {
        const { getByLabelText, getByPlaceholder } = await render(
            <TextInput label="E-mail" placeholder="seu@email.com" />
        );

        const emailNode = getByLabelText('E-mail')
        const placeholderNode = getByPlaceholder('E-seu@email.com')

        expect(emailNode).toBeDefined();
        expect(placeholderNode).toBeDefined();
    });

    it('deve permitir a digitação e disparar o evento onChange', async () => {
        const handleChange = vi.fn();
        const { getByPlaceholder } = await render(
            <TextInput placeholder='Meu input' label="Nome" onChange={handleChange} />
        );

        const input = getByPlaceholder('Meu input');
        await userEvent.type(input, 'Olá Mundo');

        expect(input).toHaveValue('Olá Mundo');
        expect(handleChange).toHaveBeenCalled();
    });

    it('deve estar desabilitado quando a prop disabled for passada', async () => {
        const { getByPlaceholder } = await render(<TextInput placeholder='Meu input' label="Bloqueado" disabled />);
        const input = getByPlaceholder('Meu input');

        expect(input).toBeDisabled();
    });

    it('deve renderizar com a largura total (fullWidth)', async () => {
        const { container } = await render(<TextInput label="Full Width" />);
        const wrapper = container.querySelector('.MuiFormControl-fullWidth');

        expect(wrapper).toBeDefined();
    });
});
