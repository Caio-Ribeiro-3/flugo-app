import { describe, it, expect } from 'vitest';
import { render } from '../../test-utils';
import { Avatar } from './avatar';

describe('Avatar Component', () => {
    it('deve renderizar a imagem corretamente', async () => {
        const testSrc = 'https://example.com/photo.jpg';
        const { getByRole } = await render(<Avatar src={testSrc} alt="User" />);

        const img = getByRole('img');
        expect(img).toHaveAttribute('src', testSrc);
    });

    it('deve aplicar estilos de borda quando solicitado', async () => {
        const { container } = await render(<Avatar hasBorder />);
        const avatarRoot = container.firstChild as HTMLElement;

        const styles = getComputedStyle(avatarRoot);
        // Verificamos a presença das propriedades injetadas pelo sx
        expect(styles.border).not.toBe('');
        expect(styles.outline).not.toBe('');
    });

    it('deve processar estilos customizados via _css', async () => {
        const { container } = await render(<Avatar _css={{ opacity: '0.8' }} />);
        const avatarRoot = container.firstChild as HTMLElement;

        expect(getComputedStyle(avatarRoot).opacity).toBe('0.8');
    });
});
