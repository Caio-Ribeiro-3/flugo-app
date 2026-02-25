import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test-utils';
import { DashboardLayout } from './dashboard-layout';

// Mock do hook de navegação
const mockNavigate = vi.fn();
vi.mock('../routing-provider/use-navigate', () => ({
    useNavigate: () => mockNavigate
}));

// Mock do Outlet para garantir que ele renderize algo identificável
vi.mock('../routing-provider/outlet', () => ({
    Outlet: () => <div data-testid="router-outlet">Conteúdo da Rota</div>
}));

// Mock do asset de imagem
vi.mock('@/assets/avatar1.png', () => ({
    default: 'mock-avatar-path.png'
}));

describe('DashboardLayout Component', () => {
    it('deve renderizar a estrutura básica do dashboard', async () => {
        const { getByText, getByTestId } = await render(<DashboardLayout />);

        // Verifica se itens da sidebar aparecem
        expect(getByText('Colaboradores')).toBeDefined();

        // Verifica se o Outlet (conteúdo variável) está presente
        expect(getByTestId('router-outlet')).toBeDefined();
    });

    it('deve chamar a navegação ao clicar no item da lista', async () => {
        const { getByText } = await render(<DashboardLayout />);

        const item = getByText('Colaboradores');
        await item.click();

        expect(mockNavigate).toHaveBeenCalled();
    });

    it('deve exibir o avatar do usuário com o alt correto', async () => {
        const { getByAltText } = await render(<DashboardLayout />);
        expect(getByAltText('Avatar do usuario atual')).toBeDefined();
    });
});
