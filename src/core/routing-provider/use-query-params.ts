import { useLocation, useNavigate } from "@tanstack/react-router"

export const useQueryParams = () => {
    const { search } = useLocation()

    const navigate = useNavigate()

    return [search, (cb: <T>(prev: T) => T) => navigate({ search: cb })]
}