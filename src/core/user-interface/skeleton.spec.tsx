import { describe, it, expect } from 'vitest';
import { render } from '../../test-utils';
import { Skeleton } from './skeleton';

describe('Skeleton Component', () => {
    it('deve renderizar com a variante padrão (rectangular)', async () => {
        const { container } = await render(<Skeleton />);
        const skeleton = container.firstChild as HTMLElement;

        expect(skeleton.className).toContain('MuiSkeleton-rectangular');
    });

    it('deve aplicar as dimensões de largura e altura corretamente', async () => {
        const { container } = await render(<Skeleton width={100} height={50} />);
        const skeleton = container.firstChild as HTMLElement;

        const styles = getComputedStyle(skeleton);
        expect(styles.width).toBe('100px');
        expect(styles.height).toBe('50px');
    });

    it('deve renderizar com a variante circular', async () => {
        const { container } = await render(<Skeleton variant="circular" />);
        const skeleton = container.firstChild as HTMLElement;

        expect(skeleton.className).toContain('MuiSkeleton-circular');
    });

    it('deve aplicar estilos customizados via _css', async () => {
        const { container } = await render(
            <Skeleton _css={{ backgroundColor: 'rgb(255, 0, 0)' }} />
        );
        const skeleton = container.firstChild as HTMLElement;

        expect(getComputedStyle(skeleton).backgroundColor).toBe('rgb(255, 0, 0)');
    });
});
