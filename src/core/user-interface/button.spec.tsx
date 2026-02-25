import { describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser'
import { Button } from './button';
import { render } from '../../test-utils';



describe('Button Component', () => {
  it('deve renderizar o texto corretamente', async () => {
    const screen = await render(<Button>Enviar</Button>);
    expect(screen.getByText('Enviar')).toBeDefined();
  });

  it('deve disparar o evento onClick quando clicado', async () => {
    const handleClick = vi.fn(() => { });
    const screen = await render(<Button onClick={handleClick}>Clique</Button>);

    await userEvent.click(screen.getByText('Clique'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve estar desabilitado quando a prop disabled é passada', async () => {
    const screen = await render(<Button disabled>Desabilitado</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('deve aplicar a cor correta para o variant contained', async () => {
    const screen = await render(<Button variant="contained">Botão</Button>);
    const button = screen.getByRole('button');
    // Verifica se a cor branca foi aplicada conforme a lógica do seu componente
    expect(getComputedStyle(button.element()).color).toBe('rgb(255, 255, 255)');
  });
});
