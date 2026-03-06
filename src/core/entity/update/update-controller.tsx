import { createContext, useContext, useMemo, type PropsWithChildren } from "react"

import { useMutation } from "@/core/query-provider/use-mutation"
import { useRepository } from "@/core/repository-provider/context-provider"
import { useToast } from "@/core/user-interface/toast"
import { useQueryclient } from "@/core/query-provider/use-query-client"

import { useEntity } from "../identity/context-provider"
import { useRecord } from "../record/context-provider"
import { useInvalidation } from "../use-invalidation"


interface UpdateControllerReturn<T = any> extends ReturnType<typeof useMutation<void, T>>, Omit<ReturnType<typeof useInvalidation>, 'executeInvalidations'> {

}

const UpdateControllerContext = createContext<UpdateControllerReturn | undefined>(undefined)

export function UpdateControllerProvider<T>({ children }: PropsWithChildren) {
    const entity = useEntity()
    const recordId = useRecord()
    const notify = useToast()
    const repository = useRepository()
    const queryClient = useQueryclient()

    const { executeInvalidations, requireInvalidation } = useInvalidation()

    const mutationKey = [entity, recordId, 'update']

    const mutation = useMutation<void, Partial<T>>({
        mutationKey,
        mutationFunction: (payload) => repository.update({ id: recordId, entity, payload }),
        onSuccess() {
            queryClient.invalidateQueries([entity])
            executeInvalidations()
        },
        onError() {
            notify({
                variant: 'error',
                message: `Não foi possível editar registro de ${entity}`
            })
        },
    })

    return (
        <UpdateControllerContext.Provider
            value={useMemo(() => ({
                requireInvalidation,
                ...mutation,
            }), [
                requireInvalidation,
                mutation,
            ])}>
            {children}
        </UpdateControllerContext.Provider>
    )


}

export function useUpdateController<T>() {
    return useContext(UpdateControllerContext)! as UpdateControllerReturn<T>
}