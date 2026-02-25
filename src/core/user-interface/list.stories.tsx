import type { Meta, StoryObj } from '@storybook/react';
import { List } from './list';

const meta: Meta<typeof List> = {
    title: 'Components/List',
    component: List,
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
    render: () => (
        <div style={{ width: 280 }}>
            <List>
                <List.ListItem>
                    <List.ListItemButton>
                        <List.ListItemText>Dashboard</List.ListItemText>
                    </List.ListItemButton>
                </List.ListItem>
                <List.ListItem>
                    <List.ListItemButton>
                        <List.ListItemText>Configurações</List.ListItemText>
                    </List.ListItemButton>
                </List.ListItem>
            </List>
        </div>
    ),
};

export const WithIcons: Story = {
    render: () => (
        <div style={{ width: 280 }}>
            <List>
                <List.ListItem>
                    <List.ListItemButton>
                        <List.ListItemIcon>🚀</List.ListItemIcon>
                        <List.ListItemText>Início</List.ListItemText>
                    </List.ListItemButton>
                </List.ListItem>
                <List.ListItem>
                    <List.ListItemButton>
                        <List.ListItemIcon>👤</List.ListItemIcon>
                        <List.ListItemText>Usuários</List.ListItemText>
                    </List.ListItemButton>
                </List.ListItem>
            </List>
        </div>
    ),
};
