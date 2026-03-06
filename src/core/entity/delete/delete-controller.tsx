import { createContext, useCallback, useContext, useMemo, type PropsWithChildren } from "react"

import { useQueryclient } from "@/core/query-provider/use-query-client"
import { useMutation } from "@/core/query-provider/use-mutation"
import { useRepository } from "@/core/repository-provider/context-provider"
import { useToast } from "@/core/user-interface/toast"
import { useEntity } from "../identity/context-provider"
import { useRecord } from "../record/context-provider"
import { useAlert } from "@/core/user-interface/alert"
import { useList } from "../list/use-list"
import { useInvalidation } from "../use-invalidation"



interface Invalidation {
    entity: string;
    recordId?: string;
}

interface DeleteControllerReturn extends Omit<ReturnType<typeof useMutation>, 'mutate'>, Omit<ReturnType<typeof useInvalidation>, 'executeInvalidations'> {
    submit(): void;
    requireInvalidation(payload: Invalidation): () => void;
}

const DeleteControllerContext = createContext<DeleteControllerReturn | undefined>(undefined)

export const DeleteControllerProvider = ({ children }: PropsWithChildren) => {
    const entity = useEntity()
    const recordId = useRecord()
    const notify = useToast()
    const alert = useAlert()
    const repository = useRepository()
    const queryClient = useQueryclient()
    const listState = useList()

    const { executeInvalidations, requireInvalidation } = useInvalidation()

    const isSingle = !!recordId

    let mutationKey = [entity, isSingle ? recordId : undefined, 'delete'].filter(Boolean) as string[]

    const mutation = useMutation<void, void>({
        mutationKey,
        mutationFunction: () => {
            if (isSingle) {
                return repository.delete({ id: recordId, entity })
            }
            return repository.delete({ ids: listState.selected, entity })
        },
        onSuccess() {
            queryClient.invalidateQueries([entity])
            executeInvalidations()
        },
        onError() {
            notify({
                variant: 'error',
                message: `Não foi possível excluir registro${isSingle ? '' : 's'} de ${entity}`
            })
        },
    })

    const submit = useCallback(() => {
        alert({
            description: `A acao nao pode ser revertida. Tem certeza que deseja excluir registro${isSingle ? '' : 's'} de ${entity}?`,
            onSubmit() {
                mutation.mutate()
            },
        })
    }, [entity, mutation.mutate])

    return (
        <DeleteControllerContext.Provider
            value={useMemo(() => ({
                requireInvalidation,
                submit,
                isLoading: mutation.isLoading,
                error: mutation.error,
                data: mutation.data,
            }), [
                requireInvalidation,
                submit,
                mutation.isLoading,
                mutation.error,
                mutation.data,
            ])}>
            {children}
        </DeleteControllerContext.Provider>
    )


}

export const useDeleteController = () => {
    return useContext(DeleteControllerContext)!
}