import type { Preview } from '@storybook/react-vite'
import { UserInterfaceProvider } from '../src/core/user-interface/context-provider'

const preview: Preview = {
  decorators: [
    (Story) => (
      <UserInterfaceProvider>
        <Story />
      </UserInterfaceProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;