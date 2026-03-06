import { useCallback, useState } from "react";

import { useQueryclient } from "../query-provider/use-query-client";



export interface Invalidation {
    entity: string;
    recordId?: string;
}

export const useInvalidation = () => {
    const queryClient = useQueryclient()
    const [invalidations, setInvalidations] = useState<Invalidation[]>([])


    const requireInvalidation = useCallback((payload: Invalidation) => {
        const newInvalidation = payload
        setInvalidations(prev => [...prev, newInvalidation])

        return () => setInvalidations(prev => prev.filter(invalidation => invalidation !== newInvalidation))
    }, [])

    const executeInvalidations = useCallback(() => {
        invalidations.forEach(invalidation => {
            queryClient.invalidateQueries([invalidation.entity, invalidation.recordId].filter(Boolean) as string[])
        })
    }, [invalidations])

    return {
        requireInvalidation,
        executeInvalidations
    }
}