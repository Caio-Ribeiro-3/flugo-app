import { createContext, useContext, useMemo, type PropsWithChildren } from "react"

import { useMutation } from "@/core/query-provider/use-mutation"
import { useRepository } from "@/core/repository-provider/context-provider"
import { useToast } from "@/core/user-interface/toast"
import { useQueryclient } from "@/core/query-provider/use-query-client"

import { useEntity } from "../identity/context-provider"
import { useInvalidation } from "../use-invalidation"


interface CreateControllerReturn<T = any> extends ReturnType<typeof useMutation<void, T>>, Omit<ReturnType<typeof useInvalidation>, 'executeInvalidations'> {

}

const CreateControllerContext = createContext<CreateControllerReturn | undefined>(undefined)

export function CreateControllerProvider<T>({ children }: PropsWithChildren) {
    const entity = useEntity()
    const notify = useToast()
    const repository = useRepository()
    const queryClient = useQueryclient()

    const { executeInvalidations, requireInvalidation } = useInvalidation()

    const mutationKey = [entity, 'create']

    const mutation = useMutation<void, Partial<T>>({
        mutationKey,
        mutationFunction: (payload) => repository.create({ entity, payload }),
        onSuccess() {
            queryClient.invalidateQueries([entity])
            executeInvalidations()
        },
        onError() {
            notify({
                variant: 'error',
                message: `Não foi possível criar registro de ${entity}`
            })
        },
    })

    return (
        <CreateControllerContext.Provider
            value={useMemo(() => ({
                requireInvalidation,
                ...mutation,
            }), [
                requireInvalidation,
                mutation,
            ])}>
            {children}
        </CreateControllerContext.Provider>
    )


}

export function useCreateController<T>() {
    return useContext(CreateControllerContext)! as CreateControllerReturn<T>
}