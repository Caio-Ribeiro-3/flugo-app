import {
    useQueryClient as useQueryclientTS,
} from '@tanstack/react-query'

import type { QueryClient } from './types'


export function useQueryclient(): QueryClient {
    const queryClient = useQueryclientTS()
    return {
        getQuery(queryKey) {
            return queryClient.getQueryCache().findAll({ queryKey })[0]?.state.data
        },
        async invalidateQueries(queryKey: Parameters<typeof queryClient.invalidateQueries>[0]) {
            queryKey
            await queryClient.invalidateQueries(
                // TODO - Implementar invalidacao de cache mais preciso
                // queryKey
            )
        },
    } as QueryClient
}
