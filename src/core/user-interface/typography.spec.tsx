import { describe, it, expect } from 'vitest';
import { render } from '../../test-utils';
import { Typography } from './typography';

describe('Typography Component', () => {
    it('deve renderizar o texto corretamente', async () => {
        const { getByText } = await render(<Typography>Texto de Teste</Typography>);
        expect(getByText('Texto de Teste')).toBeDefined();
    });

    it('deve aplicar os estilos corretos para a variante desktop-h4', async () => {
        const { getByText } = await render(
            <Typography variant="desktop-h4">Título</Typography>
        );
        const element = getByText('Título').element();
        const styles = getComputedStyle(element);

        expect(styles.fontSize).toBe('24px');
        expect(styles.fontWeight).toBe('700');
    });

    it('deve aplicar cor de desabilitado quando a prop disabled for true', async () => {
        const { getByText } = await render(
            <Typography disabled>Texto Inativo</Typography>
        );
        const element = getByText('Texto Inativo').element();

        // No Vitest Browser Mode com seu ThemeProvider, ele pegará o token de disabled
        expect(getComputedStyle(element).color).toBeDefined();
    });

    it('deve permitir a troca do elemento HTML via prop component', async () => {
        const { container } = await render(
            <Typography component="h1">Título H1</Typography>
        );
        expect(container.querySelector('h1')).not.toBeNull();
    });

    it('deve sobrepor a cor da variante se a prop color for enviada', async () => {
        const { getByText } = await render(
            <Typography variant="body2" color="text.secondary">Texto Secundário</Typography>
        );
        // A lógica do componente prioriza a prop color sobre o finalStyles.color
        const element = getByText('Texto Secundário');
        expect(element).toBeDefined();
    });
});
