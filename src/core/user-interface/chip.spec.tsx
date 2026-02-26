import { describe, it, expect } from 'vitest';
import { render } from '../../test-utils';
import { Chip } from './chip';

describe('Chip Component', () => {
    it('deve renderizar o texto enviado como children corretamente', async () => {
        const { getByText } = await render(<Chip>Ativo</Chip>);
        expect(getByText('Ativo')).toBeDefined();
    });

    it('deve aplicar estilos customizados para o estado de sucesso', async () => {
        const { getByText } = await render(<Chip color="success">Sucesso</Chip>);
        const chipElement = getByText('Sucesso').element().parentElement as HTMLElement;

        const styles = getComputedStyle(chipElement);
        expect(styles.backgroundColor).toContain('rgba(34, 197, 94, 0.16)');
    });

    it('deve aplicar estilos customizados para o estado de erro', async () => {
        const { getByText } = await render(<Chip color="error">Erro</Chip>);
        const chipElement = getByText('Erro').element().parentElement as HTMLElement;

        const styles = getComputedStyle(chipElement);
        expect(styles.backgroundColor).toContain('rgba(255, 86, 48, 0.16)');
    });
});
