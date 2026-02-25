import {
    useQueryClient as useQueryclientTS,
} from '@tanstack/react-query'

import type { QueryClient } from './types'


export function useQueryclient(): QueryClient {
    const queryClient = useQueryclientTS()

    return queryClient as QueryClient
}
