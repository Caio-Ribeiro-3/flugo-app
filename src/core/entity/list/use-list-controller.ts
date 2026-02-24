import { useCallback, useMemo } from "react"

import { useQuery, type UseQueryProps } from "@/core/query-provider/context-provider"
import { useQueryParams } from "@/core/routing-provider/use-query-params"

export type UseListControllerProps = Omit<UseQueryProps, 'queryKey'>

export const useListController = <
    Model extends Record<string, unknown>,
    QueryParams extends Record<string, unknown> = Record<string, unknown>
>({
    entity,
    staleTime
}: UseListControllerProps) => {
    const [queryParams, setQueryParams] = useQueryParams()

    const applyPrefix = useCallback((queryParams_: typeof queryParams) => {
        const slicedQueryParams: Partial<QueryParams> = {}
        for (const key in queryParams_) {
            if (key.startsWith(entity)) {
                slicedQueryParams[key.replace(`${entity}::`, '') as keyof Partial<QueryParams>] = queryParams_[key]
            }
        }
        return slicedQueryParams as Partial<QueryParams>
    }, [queryParams, entity])

    const queryParamsForEntity = useMemo<Partial<QueryParams>>(() => {
        return applyPrefix(queryParams)
    }, [applyPrefix])

    const setQueryParamsForEntity = useCallback((cb: (prev: Partial<QueryParams>) => Partial<QueryParams>) => {
        setQueryParams((prev: Partial<QueryParams>) => {
            const result: Partial<QueryParams> = {}
            const temp = cb(applyPrefix(prev))
            for (const key in temp) {
                if (!key.startsWith(entity)) {
                    result[`${entity}::${key}` as keyof Partial<QueryParams>] = temp[key]
                } else {
                    result[key] = temp[key]
                }
            }
            return result
        })
    }, [setQueryParams, applyPrefix])

    const query = useQuery<Model>({
        entity,
        queryKey: ['list', queryParamsForEntity],
        staleTime
    })

    return {
        ...query,
        queryParams: queryParamsForEntity,
        setQueryParams: setQueryParamsForEntity
    }
}