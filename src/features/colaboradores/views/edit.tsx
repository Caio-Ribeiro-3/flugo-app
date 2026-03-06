import { useNavigate } from "@/core/routing-provider/use-navigate";
import { IDENTITY, type Colaborador } from "../model";
import { CreateEditForm } from "../create-edit-form";
import { useParams } from "@/core/routing-provider/use-params";
import { useListController } from "@/core/entity/list/list-controller";
import { useLayoutEffect } from "react";
import { useApp } from "@/core/app-shell";
import { useToast } from "@/core/user-interface/toast";
import { useEntity } from "@/core/entity/identity/context-provider";
import { UpdateControllerProvider, useUpdateController } from "@/core/entity/update/update-controller";
import { RecordContext } from "@/core/entity/record/context-provider";



const EditColaboradoresBase = ({ initialData }: { initialData: Colaborador }) => {
    const navigate = useNavigate()
    const { mutate, isLoading } = useUpdateController()


    return (
        <CreateEditForm
            isLoading={isLoading}
            onSubmit={(payload) => {
                mutate(payload)
                    .then(() => {
                        navigate(`/dashboard/${IDENTITY}`)
                    })
            }}
            initialData={initialData}
        />
    )
}

export const EditColaboradoresPage = () => {
    const app = useApp()
    const { colaboradorId } = useParams<{ colaboradorId: string; }>(prev => ({ colaboradorId: prev.colaboradorId }))
    const { data, isLoading } = useListController<Colaborador>()
    const navigate = useNavigate()
    const notify = useToast()
    const entity = useEntity()

    const initialData = data.data.find(el => el.id === colaboradorId)

    useLayoutEffect(() => {
        if (!initialData && !isLoading) {
            notify({
                variant: 'error',
                message: `Nao foi possivel encontrar registro de ${entity} com id ${colaboradorId}`
            })
            navigate(app.defaultAuthenticatedRoute)
        }

    }, [initialData, isLoading])

    if (!initialData) return null

    return (
        <RecordContext.Provider value={colaboradorId}>
            <UpdateControllerProvider>
                <EditColaboradoresBase initialData={initialData} />
            </UpdateControllerProvider>
        </RecordContext.Provider>
    )
}