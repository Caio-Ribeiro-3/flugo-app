import { createContext, useContext, type PropsWithChildren } from "react"

import { QueryContext } from "./query-provider/context-provider"
import { RepositoryContext } from "./repository-provider/context-provider"
import type { RepositoryProvider } from "./repository-provider/types"
import { UserInterfaceProvider } from "./user-interface/context-provider"
import { AuthProviderContext } from "./auth/context-provider"
import type { AuthProvider } from "./auth/types"


export interface AppShellProps {
    repositoryProvider: RepositoryProvider
    authProvider: AuthProvider
    defaultAuthenticatedRoute: string;
}

const AppContext = createContext<Pick<AppShellProps, 'defaultAuthenticatedRoute'> | undefined>(undefined)

export const AppShell = ({
    repositoryProvider,
    authProvider,
    defaultAuthenticatedRoute,
    children,
}: PropsWithChildren<AppShellProps>) => {
    return (
        <AppContext.Provider value={{
            defaultAuthenticatedRoute,
        }}>
            <RepositoryContext.Provider value={repositoryProvider}>
                <QueryContext>
                    <UserInterfaceProvider>
                        <AuthProviderContext.Provider value={authProvider}>
                            {children}
                        </AuthProviderContext.Provider>
                    </UserInterfaceProvider>
                </QueryContext>
            </RepositoryContext.Provider>
        </AppContext.Provider>
    )
}

export const useApp = () => useContext(AppContext)!