import { useEffect, useMemo } from 'react'

import {
    useQuery as useQueryTS,
} from '@tanstack/react-query'

import { useRepository } from "../repository-provider/context-provider"
import type { BaseRecord, Filter, ListResult, Pagination, Sort } from "../repository-provider/types"
import { deepSort } from '../utils/deep-sort'
import { useQueryclient } from './use-query-client'
import { useToast } from '../user-interface/toast'
import { useEntity } from '../entity/identity/context-provider'
import { deepFilter } from '../utils/deep-filter'

export interface UseQueryProps {
    queryKey: (string | object)[]
    staleTime?: number
    sort: Sort
    pagination: Pagination
    filters: Filter;
}

export interface UseQueryReturn<RecordData extends BaseRecord> {
    data: ListResult<RecordData>
    error: Error | null
    isLoading: boolean
}

export const DEFAULT_STALE_TIME = 1000 * 60 * 5


export function useQuery<RecordData extends BaseRecord>({
    queryKey,
    staleTime = DEFAULT_STALE_TIME,
    sort,
    pagination,
    filters
}: UseQueryProps): UseQueryReturn<RecordData> {
    const queryClient = useQueryclient()
    const repository = useRepository()
    const notify = useToast()
    const entity = useEntity()

    const cachedData = queryClient.getQuery<ListResult<RecordData>>(queryKey)

    const { data, error, isLoading } = useQueryTS({
        queryKey,
        queryFn: () => repository.list({
            entity,
            sort,
            pagination,
        }),
        staleTime,
    })

    useEffect(() => {
        if (error) {
            notify({ variant: 'error', message: `Não foi possível listar registros de ${entity}` })
        }
    }, [error])


    return useMemo(() => {
        const finalData = (cachedData || data)
        let result = finalData?.data as unknown as RecordData[] || []
        const total = finalData?.total || result?.length || 0

        result = deepSort(result, sort)

        if (pagination.page && pagination.perPage) {
            const temp: typeof result = []
            for (let i = 0; i < pagination.perPage; i++) {
                const item = result[pagination.perPage * (pagination.page - 1) + i]
                if (item) {
                    temp.push(item)
                }
            }
            result = temp
        }

        result = deepFilter(
            result,
            filters,
            filters.reduce<Record<string, any>>((acc, curr) => {
                if (curr.entity !== entity) {
                    acc[curr.entity as keyof typeof acc] = (queryClient.getQuery([curr.entity, 'list']) as { data: any })?.data
                }
                return acc
            }, {})
        )

        return {
            data: {
                data: result,
                page: pagination?.page || 0,
                perPage: pagination?.perPage || 0,
                total
            },
            error,
            isLoading,
        }
    }, [
        data,
        cachedData,
        error,
        isLoading,
        sort,
        pagination,
        filters
    ])
}