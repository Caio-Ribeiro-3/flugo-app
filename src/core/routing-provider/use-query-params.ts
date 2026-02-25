import { useLocation, useNavigate } from "@tanstack/react-router"

export const useQueryParams = () => {
    const { search } = useLocation()

    const navigate = useNavigate()
    // @ts-ignore: @tanstack/react-router nao disponibiliza todas as interfaces para tipagem correta, ainda assim, temos um unico ponto de falha
    return [search, (cb: <T>(prev: T) => T) => navigate({ search: cb })]
}