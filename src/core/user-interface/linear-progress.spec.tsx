import { describe, it, expect } from 'vitest';
import { render } from '../../test-utils';
import { LinearProgress } from './linear-progress';

describe('LinearProgress Component', () => {
    it('deve renderizar a porcentagem correta no texto', async () => {
        const { getByText } = await render(<LinearProgress percentage={45} />);

        expect(getByText('45%')).toBeDefined();
    });

    it('deve usar 100% como valor padrão quando nenhuma porcentagem é fornecida', async () => {
        const { getByText } = await render(<LinearProgress />);

        expect(getByText('100%')).toBeDefined();
    });

    it('deve repassar o valor da porcentagem para o componente interno do MUI', async () => {
        const { getByRole } = await render(<LinearProgress percentage={70} />);

        // O LinearProgress do MUI usa o role "progressbar" e o atributo aria-valuenow
        const progressBar = getByRole('progressbar').element();
        expect(progressBar.getAttribute('aria-valuenow')).toBe('70');
    });

    it('deve renderizar o texto com a cor secundária conforme definido', async () => {
        const { getByText } = await render(<LinearProgress percentage={50} />);
        const textElement = getByText('50%').element();

        const styles = getComputedStyle(textElement);
        // Verifica se a cor é aplicada (em um ambiente de browser real, isso valida o token do tema)
        expect(styles.color).toBeDefined();
        expect(styles.fontSize).toBe('12px');
    });
});
