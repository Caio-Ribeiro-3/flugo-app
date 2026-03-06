import { useNavigate } from "@/core/routing-provider/use-navigate";
import { useCreateController } from "@/core/entity/create/create-controller";

import { CreateEditForm } from "../create-edit-form";
import { IDENTITY } from "../model";
import { useCallback } from "react";



export const CreateColaboradoresPage = () => {
    const navigate = useNavigate()

    const { mutate, isLoading } = useCreateController()

    return (
        <CreateEditForm
            isLoading={isLoading}
            onSubmit={useCallback((payload) => {
                mutate(payload)
                    .then(() => {
                        navigate(`/dashboard/${IDENTITY}`)
                    })
            }, [])}
        />
    )

}