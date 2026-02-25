import type { Meta, StoryObj } from '@storybook/react';
import { LinearProgress } from './linear-progress';

const meta: Meta<typeof LinearProgress> = {
    title: 'Components/LinearProgress',
    component: LinearProgress,
    argTypes: {
        percentage: {
            control: { type: 'range', min: 0, max: 100, step: 1 },
        },
    },
};

export default meta;
type Story = StoryObj<typeof LinearProgress>;

export const Default: Story = {
    args: {
        percentage: 100,
    },
};

export const InProgress: Story = {
    args: {
        percentage: 65,
    },
};

export const Starting: Story = {
    args: {
        percentage: 10,
    },
};

export const ContainerTest: Story = {
    render: (args) => (
        <div style={{ width: '300px', padding: '20px', border: '1px dashed #ccc' }}>
            <LinearProgress {...args} />
        </div>
    ),
    args: {
        percentage: 85,
    },
};
