import { describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from '../../test-utils';
import { List } from './list';

describe('List Component', () => {
    it('deve renderizar a hierarquia completa e o texto corretamente', async () => {
        const { getByText } = await render(
            <List>
                <List.ListItem>
                    <List.ListItemText>Item de Teste</List.ListItemText>
                </List.ListItem>
            </List>
        );

        expect(getByText('Item de Teste')).toBeDefined();
    });

    it('deve disparar o evento onClick ao clicar no ListItemButton', async () => {
        const handleClick = vi.fn();
        const { getByRole } = await render(
            <List>
                <List.ListItem>
                    <List.ListItemButton onClick={handleClick}>
                        <List.ListItemText>Clique Aqui</List.ListItemText>
                    </List.ListItemButton>
                </List.ListItem>
            </List>
        );

        const button = getByRole('button');
        await userEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('deve aplicar estilos customizados via _css no ListItemIcon', async () => {
        const { container } = await render(
            <List>
                <List.ListItem>
                    <List.ListItemIcon _css={{ color: 'rgb(255, 0, 0)' }}>
                        <span data-testid="icon" />
                    </List.ListItemIcon>
                </List.ListItem>
            </List>
        );

        const iconContainer = container.querySelector('.MuiListItemIcon-root') as HTMLElement;
        expect(getComputedStyle(iconContainer).color).toBe('rgb(255, 0, 0)');
        // Valida se o minWidth: auto foi aplicado (sobrescrevendo o padrão do MUI)
        expect(getComputedStyle(iconContainer).minWidth).toBe('auto');
    });
});
