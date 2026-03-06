import { useMemo } from "react"

import { useMutation } from "@tanstack/react-query"

import { useNavigate } from "../routing-provider/use-navigate"
import { useToast } from "../user-interface/toast"

import { useAuth } from "./context-provider"
import { useCurrentUser } from "./use-current-user"

export const useLogout = () => {
    const { isAuthenticated } = useCurrentUser()
    const authProvider = useAuth()
    const navigate = useNavigate()
    const notify = useToast()

    const { mutate, error, isPending: isLoading } = useMutation({
        mutationFn: () => {
            return authProvider.logout()
                .then(() => navigate('/login'))
                .catch(() => notify({ variant: 'error', message: 'Não foi possível concluir o login. Tente novamente mais tarde' }))
        },
        retry: false,

    })

    return useMemo(() => ({
        logout: !isAuthenticated ? () => { } : mutate,
        isLoading,
        error,
    }), [
        mutate,
        isLoading,
        error,
        isAuthenticated
    ])

}