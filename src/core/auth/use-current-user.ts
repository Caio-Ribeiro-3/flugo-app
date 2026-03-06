import { useMemo } from "react"
import { useNavigate } from "../routing-provider/use-navigate"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./context-provider"
import { IDENTITY } from "./types"
import { error } from "../utils/logger"
import { useApp } from "../app-shell"

export const useCurrentUser = (payload: { redirectTo?: string } | undefined = {}) => {
    const {
        redirectTo = '/login'
    } = payload
    const app = useApp()
    const authProvider = useAuth()
    const navigate = useNavigate()

    const { data: currentUser, isLoading, error: getCurrentUserError } = useQuery({
        refetchOnWindowFocus: false,
        queryKey: [IDENTITY, 'getCurrentUser'],
        queryFn: () => {
            return authProvider.setup()
                .then(() => {
                    return authProvider.getCurrentUser()
                        .then((currentUser) => {
                            if (!window.location.pathname.startsWith('dashboard')) {
                                navigate(app.defaultAuthenticatedRoute)
                            }
                            return currentUser
                        })
                        .catch(() => {
                            navigate(redirectTo)
                            return null
                        })
                })
                .catch(() => {
                    error('Setup da instancia de AuthProvider nao funcionou')
                    navigate('/404')
                })
        },
    })

    return useMemo(() => ({
        currentUser: currentUser!,
        isAuthenticated: !!currentUser,
        error: getCurrentUserError,
        isLoading
    }), [
        currentUser,
        getCurrentUserError,
        isLoading
    ])
}