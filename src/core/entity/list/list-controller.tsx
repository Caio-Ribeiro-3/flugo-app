import { createContext, useContext, type PropsWithChildren } from "react";

import { useQuery, type UseQueryReturn } from "@/core/query-provider/use-query";
import type { BaseRecord } from "@/core/repository-provider/types";

import { useEntity } from "../identity/context-provider";

import { useSort } from "./use-sort";
import { usePagination } from "./use-pagination";
import { useFilter } from "./use-filter";


type ControllerValue<Model extends BaseRecord> = UseQueryReturn<Model> & {}

const ControllerContext = createContext<ControllerValue<any> | null>(null)

export const ControllerProvider = ({ children }: PropsWithChildren) => {
    const entity = useEntity()
    const { filters } = useFilter()
    const { sort } = useSort()
    const { pagination } = usePagination()

    const query = useQuery({
        queryKey: [entity, 'list', sort, pagination, filters],
        sort,
        pagination,
        filters,
    })

    return (
        <ControllerContext.Provider value={query}>
            {children}
        </ControllerContext.Provider>
    )
}

export const useListController = <
    Model extends BaseRecord,
>() => {
    return useContext(ControllerContext)! as ControllerValue<Model>
}