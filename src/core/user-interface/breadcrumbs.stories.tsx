import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
    render: () => (
        <Breadcrumbs>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Configurações</a>
            <span style={{ fontWeight: 'bold' }}>Usuário</span>
        </Breadcrumbs>
    ),
};

export const LargePath: Story = {
    render: () => (
        <Breadcrumbs>
            <span style={{ opacity: 0.6 }}>App</span>
            <span style={{ opacity: 0.6 }}>Projeto Alpha</span>
            <span style={{ opacity: 0.6 }}>Sprint 42</span>
            <span style={{ fontWeight: 'bold' }}>Backlog</span>
        </Breadcrumbs>
    ),
};
