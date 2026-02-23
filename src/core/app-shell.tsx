import { QueryContext } from "./query-provider/context-provider"
import { RepositoryContext } from "./repository-provider/context-provider"
import type { RepositoryProvider } from "./repository-provider/types"
import { UserInterfaceProvider } from "./user-interface/context-provider"
import { RoutingProvider } from "./routing-provider/context-provider"
import type { Route } from "./routing-provider/types"

export interface AppShellProps {
    repositoryProvider: RepositoryProvider
    routes: Route[]
}

export const AppShell = ({
    repositoryProvider,
    routes
}: AppShellProps) => {
    return (
        <RepositoryContext.Provider value={repositoryProvider}>
            <QueryContext>
                <UserInterfaceProvider>
                    <RoutingProvider routes={routes} />
                </UserInterfaceProvider>
            </QueryContext>
        </RepositoryContext.Provider>
    )
}