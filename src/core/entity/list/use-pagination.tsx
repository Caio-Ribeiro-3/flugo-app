import { createContext, memo, useContext, useMemo, useState, type PropsWithChildren } from "react";

import type { Pagination } from "@/core/repository-provider/types";



export const DEFAULT_PAGINATION: Pagination = {
    perPage: 10,
    page: 1
}

const PaginationContext = createContext<{ pagination: Pagination, setPagination: React.Dispatch<React.SetStateAction<Pagination>> } | undefined>(undefined)

export const PaginationContextProvider = memo(({ children }: PropsWithChildren) => {
    const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION)
    return (
        <PaginationContext.Provider
            value={useMemo(() => ({
                pagination,
                setPagination
            }), [
                pagination,
                setPagination
            ])}>
            {children}
        </PaginationContext.Provider>
    )
})

export const usePagination = () => {
    return useContext(PaginationContext)!
}