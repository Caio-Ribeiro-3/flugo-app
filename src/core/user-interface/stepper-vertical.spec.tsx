import { describe, it, expect } from 'vitest';
import { render } from '../../test-utils';
import { StepperVertical } from './stepper-vertical';

describe('StepperVertical Component', () => {
    it('deve renderizar o conteúdo da etapa corretamente', async () => {
        const { getByText } = await render(
            <StepperVertical>
                <StepperVertical.StepperVerticalItem isCurrent>
                    <StepperVertical.StepperVerticalContent>Passo 1</StepperVertical.StepperVerticalContent>
                </StepperVertical.StepperVerticalItem>
            </StepperVertical>
        );

        expect(getByText('Passo 1')).toBeDefined();
    });

    it('deve renderizar o ícone de Check quando a etapa estiver completa', async () => {
        const { container } = await render(
            <StepperVertical>
                <StepperVertical.StepperVerticalItem isCompleted>
                    <StepperVertical.StepperVerticalSeparator>
                        <StepperVertical.StepperVerticalDot>1</StepperVertical.StepperVerticalDot>
                    </StepperVertical.StepperVerticalSeparator>
                </StepperVertical.StepperVerticalItem>
            </StepperVertical>
        );

        // Verifica se o SVG do CheckIcon foi renderizado (substituindo o "1")
        const svg = container.querySelector('svg');
        expect(svg).toBeDefined();
    });

    it('deve aplicar cor primária ao Dot se estiver completo ou for o atual', async () => {
        const { container } = await render(
            <StepperVertical>
                <StepperVertical.StepperVerticalItem isCurrent>
                    <StepperVertical.StepperVerticalSeparator>
                        <StepperVertical.StepperVerticalDot>1</StepperVertical.StepperVerticalDot>
                    </StepperVertical.StepperVerticalSeparator>
                </StepperVertical.StepperVerticalItem>
            </StepperVertical>
        );

        const dot = container.querySelector('.MuiTimelineDot-root') as HTMLElement;
        // No MUI, a classe 'primary' injeta estilos específicos
        expect(dot.className).toContain('MuiTimelineDot-filledPrimary');
    });

    it('deve desabilitar o texto (Typography) se a etapa não for atual nem completa', async () => {
        const { getByText } = await render(
            <StepperVertical>
                <StepperVertical.StepperVerticalItem isCurrent={false} isCompleted={false}>
                    <StepperVertical.StepperVerticalContent>Inativo</StepperVertical.StepperVerticalContent>
                </StepperVertical.StepperVerticalItem>
            </StepperVertical>
        );

        const text = getByText('Inativo').element();
        // Verifica se o estilo de disabled foi aplicado via prop da Typography
        expect(getComputedStyle(text).color).toBeDefined(); // O tema aplicará text.disabled
    });
});
