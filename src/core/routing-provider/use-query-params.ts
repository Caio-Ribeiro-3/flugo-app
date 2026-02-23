import { useLocation, useNavigate } from "@tanstack/react-router"

export const useQueryParams = () => {
    const { search } = useLocation({
        structuralSharing: true
    })

    const navigate = useNavigate()

    return [search, (cb: <T>(prev: T) => T) => navigate({ search: cb })]
}