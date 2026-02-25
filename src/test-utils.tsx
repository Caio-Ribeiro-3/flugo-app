// src/test-utils.tsx
import type { ReactElement, ReactNode } from 'react';

import { render, type ComponentRenderOptions } from 'vitest-browser-react'

import { UserInterfaceProvider } from './core/user-interface/context-provider';

function AppProviders({ children }: { children: ReactNode }) {
    return (
        <UserInterfaceProvider>
            {children}
        </UserInterfaceProvider>
    );
}

const customRender = (
    ui: ReactElement,
    options?: ComponentRenderOptions,
) =>
    render(ui, { wrapper: AppProviders, ...options });

// // Re-export everything from React Testing Library
// export * from '@testing-library/react';
export * from 'vitest-browser-react'

export { customRender as render };
