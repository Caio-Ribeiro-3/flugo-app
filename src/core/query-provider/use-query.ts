import { useMemo } from 'react'

import {
    useQuery as useQueryTS,
} from '@tanstack/react-query'

import { useRepository } from "../repository-provider/context-provider"
import type { BaseRecord, ListResult, Pagination, Sort } from "../repository-provider/types"
import { deepSort } from '../utils/deep-sort'
import { useQueryclient } from './use-query-client'

export interface UseQueryProps {
    entity: string
    queryKey: (string | object)[]
    staleTime?: number
    sort: Sort
    pagination: Pagination
    sortAndPaginationStrategy?: 'client' | 'server'
}

export interface UseQueryReturn<RecordData extends BaseRecord> {
    data: ListResult<RecordData>
    error: Error | null
    isLoading: boolean
}

export const DEFAULT_STALE_TIME = 1000 * 60 * 5


export function useQuery<RecordData extends BaseRecord>({
    entity,
    queryKey,
    staleTime = DEFAULT_STALE_TIME,
    sort,
    pagination,
    sortAndPaginationStrategy = 'client'
}: UseQueryProps): UseQueryReturn<RecordData> {
    const queryClient = useQueryclient()
    const repository = useRepository()

    const finalQueryKey: UseQueryProps['queryKey'] = [entity]
    if (sortAndPaginationStrategy === 'server') {
        finalQueryKey.push(queryKey)
    }
    const cachedData = queryClient.getQuery<UseQueryReturn<RecordData>>(finalQueryKey)

    const { data, error, isLoading } = useQueryTS({
        queryKey: finalQueryKey,
        queryFn: () => repository.list({
            entity,
            sort,
            pagination
        }),
        staleTime,
    })

    return useMemo(() => ({
        data: {
            data: deepSort((cachedData?.data || data?.data || []) as unknown as RecordData[], sortAndPaginationStrategy === 'client' ? sort : []),
            page: data?.page || 0,
            perPage: data?.perPage || 0,
            total: data?.total || 0
        },
        error,
        isLoading,
    }), [
        data?.data,
        cachedData,
        error,
        isLoading,
        sort,
        pagination
    ])
}