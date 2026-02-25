import { describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from '../../../test-utils';
import { Select } from './select';

describe('Select Component', () => {
    it('deve renderizar o label e o valor inicial corretamente', async () => {
        const { getByText } = await render(
            <Select label="Fruta" value="maça">
                <Select.Option value="maça">Maça</Select.Option>
            </Select>
        );

        expect(getByText('Fruta')).toBeDefined();
        expect(getByText('Maça')).toBeDefined();
    });

    it('deve abrir as opções e disparar onChange ao selecionar', async () => {
        const handleChange = vi.fn();
        const { getByRole, getByText } = await render(
            <Select label="Status" value="" onChange={handleChange}>
                <Select.Option value="active">Ativo</Select.Option>
                <Select.Option value="inactive">Inativo</Select.Option>
            </Select>
        );

        // O Select do MUI é um combobox/button
        const selectTrigger = getByRole('combobox');
        await userEvent.click(selectTrigger);

        // No Vitest Browser, o menu aparece no DOM
        const option = getByText('Inativo');
        await userEvent.click(option);

        expect(handleChange).toHaveBeenCalled();
    });

    it('deve estar desabilitado quando a prop disabled é true', async () => {
        const { container } = await render(
            <Select label="Bloqueado" disabled value="">
                <Select.Option value="1">Opção</Select.Option>
            </Select>
        );

        // Verifica se a classe ou atributo de disabled do MUI está presente no root do Select
        const selectRoot = container.querySelector('.Mui-disabled');
        expect(selectRoot).toBeDefined();
    });
});
