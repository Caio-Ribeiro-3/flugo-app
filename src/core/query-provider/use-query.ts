import { useMemo } from 'react'

import {
    useQuery as useQueryTS,
} from '@tanstack/react-query'

import { useRepository } from "../repository-provider/context-provider"
import type { BaseRecord, ListResult, Pagination, Sort } from "../repository-provider/types"

export interface UseQueryProps {
    entity: string
    queryKey: (string | object)[]
    staleTime?: number
    sort: Sort
    pagination: Pagination
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
    staleTime = DEFAULT_STALE_TIME,
    sort,
    pagination
}: UseQueryProps): UseQueryReturn<RecordData> {
    const repository = useRepository()
    const { data, error, isLoading } = useQueryTS({
        queryKey: [entity, queryKey],
        queryFn: () => repository.list({
            entity,
            sort,
            pagination
        }),
        staleTime,
    })

    return useMemo(() => ({
        data: {
            data: data?.data || [],
            page: data?.page || 0,
            perPage: data?.perPage || 0,
            total: data?.total || 0
        },
        error,
        isLoading,
    }), [
        data,
        error,
        isLoading,
    ])
}