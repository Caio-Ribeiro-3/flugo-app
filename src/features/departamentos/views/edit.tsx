import { useNavigate } from "@/core/routing-provider/use-navigate";
import { IDENTITY, type Departamento } from "../model";
import { CreateEditForm } from "../create-edit-form";
import { useParams } from "@/core/routing-provider/use-params";
import { useListController } from "@/core/entity/list/list-controller";
import { useCallback, useLayoutEffect } from "react";
import { useApp } from "@/core/app-shell";
import { useToast } from "@/core/user-interface/toast";
import { useEntity } from "@/core/entity/identity/context-provider";
import { UpdateControllerProvider, useUpdateController } from "@/core/entity/update/update-controller";
import { RecordContext } from "@/core/entity/record/context-provider";



const EditDepartamentosBase = ({ initialData }: { initialData: Departamento }) => {
    const navigate = useNavigate()
    const { mutate, isLoading } = useUpdateController()

    const onSubmit = useCallback((payload: unknown) => {
        mutate(payload)
            .then(() => {
                navigate(`/dashboard/${IDENTITY}`)
            })
    }, [mutate, navigate])

    return (
        <CreateEditForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            initialData={initialData}
        />
    )
}

export const EditDepartamentosPage = () => {
    const app = useApp()
    const { departamentoId } = useParams<{ departamentoId: string; }>(prev => ({ departamentoId: prev.departamentoId }))
    const { data, isLoading } = useListController<Departamento>()
    const navigate = useNavigate()
    const notify = useToast()
    const entity = useEntity()

    const initialData = data.data.find(el => el.id === departamentoId)

    useLayoutEffect(() => {
        if (!initialData && !isLoading) {
            notify({
                variant: 'error',
                message: `Nao foi possivel encontrar registro de ${entity} com id ${departamentoId}`
            })
            navigate(app.defaultAuthenticatedRoute)
        }

    }, [initialData, isLoading])

    if (!initialData) return null

    return (
        <RecordContext.Provider value={departamentoId}>
            <UpdateControllerProvider>
                <EditDepartamentosBase initialData={initialData} />
            </UpdateControllerProvider>
        </RecordContext.Provider>
    )
}