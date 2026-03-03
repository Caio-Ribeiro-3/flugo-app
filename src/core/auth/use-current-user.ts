import { useMemo } from "react"
import { useNavigate } from "../routing-provider/use-navigate"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./context-provider"
import { IDENTITY } from "./types"
import { error } from "../utils/logger"

export const useCurrentUser = (payload: { redirectTo?: string } | undefined = {}) => {
    const {
        redirectTo = '/login'
    } = payload
    const authProvider = useAuth()
    const navigate = useNavigate()

    const { data: currentUser, isLoading, error: getCurrentUserError } = useQuery({
        queryKey: [IDENTITY, 'getCurrentUser'],
        queryFn: () => {
            return authProvider.setup()
                .then(() => {
                    return authProvider.getCurrentUser()
                        .then((currentUser) => {
                            navigate('/dashboard')
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

    console.log({ currentUser })

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