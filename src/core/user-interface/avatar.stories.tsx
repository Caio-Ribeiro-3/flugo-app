import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './avatar';
import avatar1SRC from '../../assets/avatar1.png'

const meta: Meta<typeof Avatar> = {
    title: 'Components/Avatar',
    component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Basic: Story = {
    args: {
        src: avatar1SRC,
        alt: 'Avatar Usuário',
    },
};

export const WithBorder: Story = {
    args: {
        ...Basic.args,
        hasBorder: true,
    },
};
