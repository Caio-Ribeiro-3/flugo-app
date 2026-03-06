import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, type PropsWithChildren } from "react"
import { useQuery } from "@/core/query-provider/use-query";
import { useSort } from "./use-sort";
import { usePagination } from "./use-pagination";
import { useEntity } from "../identity/context-provider";
import { useFilter } from "./use-filter";



const ListContext = createContext<{ selected: string[]; toggleSelect(id: string): void; clear(): void; selectAll(): void; } | undefined>(undefined)

export const ListContextProvider = ({ children }: PropsWithChildren) => {
    const [selected, setSelected] = useState<string[]>([])
    const entity = useEntity()
    const { filters } = useFilter()
    const { sort } = useSort()
    const { pagination } = usePagination()

    const { data } = useQuery({
        queryKey: [entity, 'list', sort, pagination],
        sort,
        pagination,
        filters
    })



    const toggleSelect = useCallback((id: string) => {
        setSelected(prev => {
            const record = data.data.find(el => el.id === id)
            if (record && !prev.includes(id)) {
                return [...prev, id]
            }
            return prev.filter(el => el !== id)
        })
    }, [data.data, setSelected])

    const clear = useCallback(() => {
        setSelected([])
    }, [setSelected])

    const selectAll = useCallback(() => {
        setSelected(data.data.map(el => el.id))
    }, [data.data, setSelected])

    useLayoutEffect(() => {
        setSelected((prev) => {
            let newSelected: typeof prev = []
            prev.forEach(id => {
                const exists = data.data.find(innerEl => id === innerEl.id)
                if (exists) {
                    newSelected = [...newSelected, id]
                }
            })
            return newSelected
        })
    }, [data.data, setSelected])

    return (
        <ListContext.Provider
            value={useMemo(() => ({
                selected,
                toggleSelect,
                clear,
                selectAll
            }), [
                selected,
                toggleSelect,
                clear,
                selectAll
            ])}>
            {children}
        </ListContext.Provider>
    )

}

export const useList = () => {
    return useContext(ListContext)!
}