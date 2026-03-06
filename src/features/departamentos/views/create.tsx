import { useNavigate } from "@/core/routing-provider/use-navigate";
import { useCreateController } from "@/core/entity/create/create-controller";

import { CreateEditForm } from "../create-edit-form";
import { IDENTITY } from "../model";
import { useCallback } from "react";



export const CreateDepartamentosPage = () => {
    const navigate = useNavigate()

    const { mutate, isLoading } = useCreateController()

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
        />
    )

}