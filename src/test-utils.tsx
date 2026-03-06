// src/test-utils.tsx
import type { ReactElement, ReactNode } from 'react';

import { render, type ComponentRenderOptions } from 'vitest-browser-react'

import { AppShell } from './core/app-shell';
import { MockAuthProvider } from './core/auth/adapters/mock';
import { MockRepositoryProvider } from './core/repository-provider/adapters/mock';

function AppProviders({ children }: { children: ReactNode }) {
    return (
        <AppShell
            authProvider={new MockAuthProvider()}
            repositoryProvider={new MockRepositoryProvider()}
            defaultAuthenticatedRoute='/'
        >
            {children}
        </AppShell>
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
