import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './typography';

const meta: Meta<typeof Typography> = {
    title: 'Components/Typography',
    component: Typography,
    argTypes: {
        variant: {
            control: 'select',
            options: ['h1', 'h4', 'body1', 'nav-item-default', 'desktop-h4', 'table-head', 'body2', 'subtitle2'],
        },
        color: {
            control: 'select',
            options: ['text.primary', 'text.secondary'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Typography variant="desktop-h4">Desktop H4 - Título Principal</Typography>
            <Typography variant="subtitle2">Subtitle 2 - Subtítulo com Peso</Typography>
            <Typography variant="body2">Body 2 - Texto Padrão de Parágrafo</Typography>
            <Typography variant="table-head">Table Head - Cabeçalho de Tabela</Typography>
            <Typography variant="nav-item-default">Nav Item - Menu de Navegação</Typography>
            <Typography variant="body2" disabled>Body 2 - Estado Desabilitado</Typography>
        </div>
    ),
};

export const CustomColor: Story = {
    args: {
        children: 'Texto com cor secundária',
        variant: 'body2',
        color: 'text.secondary',
    },
};
