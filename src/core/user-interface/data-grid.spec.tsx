import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test-utils';
import { DataGrid } from './data-grid';
import { userEvent } from 'vitest/browser';

// Mock do controller
const mockSetQueryParams = vi.fn();
vi.mock('../entity/list/use-list-controller', () => ({
    useListController: () => ({
        data: { data: [{ id: 1, nome: 'João' }], total: 1 },
        isLoading: false,
        error: null,
        queryParams: { page: 0 },
        setQueryParams: mockSetQueryParams
    })
}));

describe('DataGrid Component', () => {
    it('deve renderizar o cabeçalho e o corpo corretamente', async () => {
        const { getByText } = await render(
            <DataGrid>
                <DataGrid.Header>
                    <DataGrid.Row>
                        <DataGrid.HeaderCell id="nome">Nome Colaborador</DataGrid.HeaderCell>
                    </DataGrid.Row>
                </DataGrid.Header>
                <DataGrid.Body>
                    <DataGrid.Row>
                        <DataGrid.Cell>João Silva</DataGrid.Cell>
                    </DataGrid.Row>
                </DataGrid.Body>
            </DataGrid>
        );

        expect(getByText('Nome Colaborador')).toBeDefined();
        expect(getByText('João Silva')).toBeDefined();
    });

    it('deve disparar ordenação ao clicar no HeaderCell', async () => {
        const { getByText } = await render(
            <DataGrid>
                <DataGrid.Header>
                    <DataGrid.Row>
                        <DataGrid.HeaderCell id="nome">Nome</DataGrid.HeaderCell>
                    </DataGrid.Row>
                </DataGrid.Header>
            </DataGrid>
        );

        await userEvent.click(getByText('Nome'));
        expect(mockSetQueryParams).toHaveBeenCalled();
    });

    it('deve renderizar a paginação no footer', async () => {
        const { getByLabelText } = await render(
            <DataGrid>
                <DataGrid.Footer />
            </DataGrid>
        );

        // Verifica se o seletor de página do MUI está presente
        expect(getByLabelText(/Go to next page/i)).toBeDefined();
    });
});
