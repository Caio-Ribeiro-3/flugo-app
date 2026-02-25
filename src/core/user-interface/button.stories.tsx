import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: {
            control: 'select',
            options: ['contained', 'outlined', 'text'],
        },
        color: {
            control: 'select',
            options: ['primary', 'neutral'],
        },
        disabled: {
            control: 'boolean',
        },
    },
    args: {
        children: 'Click me',
        variant: 'contained',
        color: 'primary',
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Contained: Story = {
    args: {
        variant: 'contained',
        children: 'Contained Button',
    },
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        children: 'Outlined Button',
    },
};

export const Text: Story = {
    args: {
        variant: 'text',
        children: 'Text Button',
    },
};

export const Neutral: Story = {
    args: {
        color: 'neutral',
        variant: 'outlined',
        children: 'Neutral Button',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled Button',
    },
};