import type { PropsWithChildren } from "react"

import { useCurrentUser } from "./use-current-user"

export const Unauthenticated = ({ children }: PropsWithChildren) => {
    const { isLoading, isAuthenticated } = useCurrentUser()

    if (isLoading || isAuthenticated) return null

    return children
}