import { useLayoutEffect, type ReactNode } from "react";

import type { BaseRecord } from "@/core/repository-provider/types";

import { useListController } from "../list/list-controller";
import { EntityContext, useEntity } from "../identity/context-provider";
import { BaseList } from "../list/base-list";
import { useDeleteController } from "../delete/delete-controller";
import { useCreateController } from "../create/create-controller";
import { useUpdateController } from "../update/update-controller";
import type { Invalidation } from "../use-invalidation";
import { error } from "@/core/utils/logger";



type ForeignEntityBaseProps<T extends BaseRecord> = {
    recordId?: never;
    children(payload: { data: T[], isLoading: boolean; error: Error | null }): ReactNode;
} | {
    recordId: string;
    children(payload: { data?: T, isLoading: boolean; error: Error | null }): ReactNode;
}


function ForeignEntityBase<T extends BaseRecord>({ recordId, children }: ForeignEntityBaseProps<T>) {
    const entity = useEntity()
    const { data, error: listControllerError, isLoading } = useListController<T>()
    const deleteController = useDeleteController()
    const createController = useCreateController()
    const updateController = useUpdateController()

    let requireInvalidation = deleteController?.requireInvalidation || createController?.requireInvalidation || updateController?.requireInvalidation

    if (!requireInvalidation) {
        requireInvalidation = (payload: Invalidation) => () => { payload }
        error('<ForeignEntityBase> chamado fora dos contextos de create, update ou delete')
    }

    useLayoutEffect(() => {
        return requireInvalidation({ entity, recordId })
    }, [requireInvalidation])


    if (recordId) {
        return children({ data: data.data.find(el => el.id === recordId), error: listControllerError, isLoading })
    }

    // @ts-ignore
    return children({ data: data.data, error: listControllerError, isLoading })
}

type ForeignEntityProps<T extends BaseRecord> = ForeignEntityBaseProps<T> & {
    relationship: string;
    // relationshipType: 'one-to-one' | 'one-to-many'
}

export function ForeignEntity<T extends BaseRecord>({ relationship, ...props }: ForeignEntityProps<T>) {
    return (
        <EntityContext.Provider value={relationship}>
            <BaseList>
                <ForeignEntityBase<T>
                    {...props}
                />
            </BaseList>
        </EntityContext.Provider>
    )
}
