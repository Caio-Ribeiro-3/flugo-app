import { useCallback, useMemo, type PropsWithChildren } from 'react'

import {
    useQuery as useQueryTS,
    useMutation as useMutationTS,
    useQueryClient as useQueryclientTS,
    QueryClient as QueryClientTS,
    QueryClientProvider,
} from '@tanstack/react-query'

import { useRepository } from '@/core/repository-provider/context-provider'
import type { BaseRecord, ListResult } from '@/core/repository-provider/types'

import type { QueryClient } from './types'
import { useToast } from '../user-interface/toast'

const DEFAULT_QUERY_CLIENT = new QueryClientTS()

export const QueryContext = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={DEFAULT_QUERY_CLIENT}>
            {children}
        </QueryClientProvider>
    )
}

export function useQueryclient(): QueryClient {
    const queryClient = useQueryclientTS()

    return queryClient as QueryClient
}

export interface UseQueryProps {
    entity: string
    queryKey: (string | object)[]
    staleTime?: number
}

export interface UseQueryReturn<RecordData extends Record<string, unknown>> {
    data: ListResult<BaseRecord<RecordData>>
    error: Error | null
    isLoading: boolean

}

export const DEFAULT_STALE_TIME = 1000 * 60 * 5

export function useQuery<RecordData extends Record<string, unknown>>({
    entity,
    queryKey,
    staleTime = DEFAULT_STALE_TIME
}: UseQueryProps): UseQueryReturn<RecordData> {
    const repository = useRepository()
    const { data, error, isLoading } = useQueryTS({
        queryKey: [entity, queryKey],
        queryFn: () => repository.list({
            entity
        }),
        staleTime
    })

    return useMemo(() => ({
        data: {
            data: data?.data || [],
            limit: data?.limit,
            offset: data?.offset,
            total: data?.total
        },
        error,
        isLoading,
    }), [
        data,
        error,
        isLoading,
    ])
}

export interface UseMutationProps {
    entity: string;
    onSuccess?: () => void;
    onError?: () => void;
}

export function useMutation({
    entity,
    onSuccess,
    onError,
}: UseMutationProps) {
    const repository = useRepository()
    const queryClient = useQueryclient()
    const notify = useToast()

    const { mutate: mutateTS, data, error, isPending: isLoading } = useMutationTS<BaseRecord<Record<string, unknown>>, Error, BaseRecord<Record<string, unknown>>>({
        mutationFn: (payload) => repository.create({
            entity,
            payload
        }),
        onSuccess() {
            queryClient.invalidateQueries([entity])
            onSuccess?.()
        },
        onError() {
            if (onError) {
                onError()
            } else {
                notify({ variant: 'error', message: `Não foi possível criar novo(a) ${entity}` })
            }
        }
    })

    const mutate = useCallback(mutateTS, [mutateTS])

    return useMemo(() => ({
        mutate,
        data,
        error,
        isLoading,
    }), [
        data,
        error,
        isLoading,
    ])
}