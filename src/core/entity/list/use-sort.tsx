import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from "react";

import type { Sort } from "@/core/repository-provider/types";
import { deepCopy } from "@/core/utils/deep-copy";



const SortContext = createContext<{ sort: Sort, toggleSort(id: string): void } | undefined>(undefined)

export const SortContextProvider = ({ children }: PropsWithChildren) => {
    const [sort, setSort] = useState<Sort>([])

    const toggleSort = useCallback((id: string) => {
        setSort(prev => {
            const sortIndex = prev.findIndex(el => el.field === id)
            const newSort = deepCopy(prev)
            if (sortIndex === -1) {
                newSort.push({
                    field: id,
                    direction: 'asc'
                })
            } else {
                if (newSort[sortIndex].direction === 'asc') {
                    newSort[sortIndex] = { ...newSort[sortIndex], direction: 'desc' }
                } else {
                    newSort.splice(sortIndex, 1)
                }
            }
            return newSort
        })
    }, [])

    return (
        <SortContext.Provider
            value={useMemo(() => ({
                sort,
                toggleSort
            }), [
                sort,
                toggleSort
            ])}>
            {children}
        </SortContext.Provider>
    )
}

export const useSort = () => {
    return useContext(SortContext)!
}