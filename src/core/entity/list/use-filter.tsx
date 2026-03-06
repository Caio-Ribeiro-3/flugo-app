import { createContext, memo, useCallback, useContext, useMemo, useState, type PropsWithChildren } from "react";

import type { Filter } from "@/core/repository-provider/types";
import { useEntity } from "../identity/context-provider";



const FilterContext = createContext<{ filters: Filter, handleFilter: (field: string, value: string, references?: string, entityField?: string) => void; } | undefined>(undefined)

export const FilterContextProvider = memo(({ children }: PropsWithChildren) => {
    const entity = useEntity()
    const [filters, setFilter] = useState<Filter>([])

    const handleFilter = useCallback((field: string, value: string, references?: string, entityField?: string) => {
        setFilter(prev => {
            const filterIndex = prev.findIndex(filter => filter.field === field)

            if (filterIndex !== -1) {
                const newFilters = [...prev]

                if (!value) {
                    newFilters.splice(filterIndex, 1)
                } else {
                    newFilters[filterIndex] = {
                        ...newFilters[filterIndex],
                        value,
                        entityField
                    }
                }

                return newFilters
            }
            return [...prev, { field, strategy: 'includes', value, entity: references || entity, entityField }]
        })
    }, [setFilter, entity])

    return (
        <FilterContext.Provider
            value={useMemo(() => ({
                filters,
                handleFilter
            }), [
                filters,
                handleFilter
            ])}>
            {children}
        </FilterContext.Provider>
    )
})

export const useFilter = () => {
    return useContext(FilterContext)!
}