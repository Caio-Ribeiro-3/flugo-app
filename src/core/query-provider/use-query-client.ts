import {
    useQueryClient as useQueryclientTS,
} from '@tanstack/react-query'

import type { QueryClient } from './types'


export function useQueryclient(): QueryClient {
    const queryClient = useQueryclientTS()
    return {
        getQuery(queryKey) {
            return queryClient.getQueryData(queryKey)
        },
        async invalidateQueries(queryKey: Parameters<typeof queryClient.invalidateQueries>[0]) {
            await queryClient.invalidateQueries(queryKey)
        },
    } as QueryClient
}
