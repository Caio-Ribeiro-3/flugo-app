import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { useQuery, type UseQueryReturn } from "@/core/query-provider/use-query";
import type { BaseRecord, Pagination, Sort } from "@/core/repository-provider/types";

export const DEFAULT_PAGINATION: Pagination = {
    perPage: 10,
    page: 1
}

type ControllerValue<Model extends BaseRecord> = UseQueryReturn<Model> & {
    sort: Sort
    setSort: React.Dispatch<React.SetStateAction<Sort>>
    pagination: Pagination
    setPagination: React.Dispatch<React.SetStateAction<Pagination>>
}

const ControllerContext = createContext<ControllerValue<any> | null>(null)

export const ControllerProvider = ({ entity, children }: PropsWithChildren<{ entity: string }>) => {
    const [sort, setSort] = useState<Sort>([])
    const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION)

    const query = useQuery({
        entity,
        queryKey: ['list', sort, pagination],
        sort,
        pagination,
    })

    const value = useMemo(() => ({
        ...query,
        sort,
        setSort,
        pagination,
        setPagination
    }), [
        query,
        sort,
        setSort,
        pagination,
        setPagination
    ])

    return (
        <ControllerContext.Provider value={value}>
            {children}
        </ControllerContext.Provider>
    )
}

export const useListController = <
    Model extends BaseRecord,
>() => {
    return useContext(ControllerContext)! as ControllerValue<Model>
}