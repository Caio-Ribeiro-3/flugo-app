import { describe, it, expect } from 'vitest';
import { render } from '../../test-utils';
import { Breadcrumbs } from './breadcrumbs';

describe('Breadcrumbs Component', () => {
    it('deve renderizar os filhos corretamente', async () => {
        const { getByText } = await render(
            <Breadcrumbs>
                <span>Home</span>
                <span>Dashboard</span>
            </Breadcrumbs>
        );

        expect(getByText('Home')).toBeDefined();
        expect(getByText('Dashboard')).toBeDefined();
    });

    it('deve renderizar o separador customizado (dot)', async () => {
        const { getByRole } = await render(
            <Breadcrumbs>
                <span>A</span>
                <span>B</span>
            </Breadcrumbs>
        );

        const separator = getByRole('presentation');
        expect(separator).toBeDefined();
    });
});
