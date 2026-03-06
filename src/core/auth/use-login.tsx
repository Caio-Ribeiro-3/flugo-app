import { useMemo } from "react"

import { useMutation } from "@tanstack/react-query"

import { useNavigate } from "../routing-provider/use-navigate"
import { useToast } from "../user-interface/toast"

import { useAuth } from "./context-provider"
import { useCurrentUser } from "./use-current-user"
import { useApp } from "../app-shell"

export const useLogin = () => {
    const app = useApp()
    const { isAuthenticated } = useCurrentUser()
    const authProvider = useAuth()
    const navigate = useNavigate()
    const notify = useToast()

    const { mutate, error, isPending: isLoading } = useMutation<void, Error, Parameters<typeof authProvider.login>[0]>({
        mutationFn: (payload) => {
            return authProvider.login(payload)
                .then(() => navigate(app.defaultAuthenticatedRoute))
                .catch(() => notify({ variant: 'error', message: 'Não foi possível concluir o login. Tente novamente mais tarde' }))
        },
        retry: false,

    })

    return useMemo(() => ({
        login: isAuthenticated ? () => { } : mutate,
        isLoading,
        error,
    }), [
        mutate,
        isLoading,
        error,
        isAuthenticated
    ])

}