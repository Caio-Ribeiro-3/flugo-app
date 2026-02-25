import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './skeleton';
import { Box } from '@mui/material';

const meta: Meta<typeof Skeleton> = {
    title: 'Components/Skeleton',
    component: Skeleton,
    argTypes: {
        variant: { control: 'select', options: ['rectangular', 'circular'] },
    },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Rectangular: Story = {
    args: {
        variant: 'rectangular',
        width: 300,
        height: 20,
    },
};

export const Circular: Story = {
    args: {
        variant: 'circular',
        width: 60,
        height: 60,
    },
};

export const ComplexPlaceholder: Story = {
    render: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ width: '100%' }}>
                <Skeleton variant="rectangular" height={10} width="80%" _css={{ mb: 1 }} />
                <Skeleton variant="rectangular" height={10} width="40%" />
            </Box>
        </Box>
    ),
};
