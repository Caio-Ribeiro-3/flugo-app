import {
    useMutation as useMutationTS,
} from '@tanstack/react-query'

import { useRepository } from "../repository-provider/context-provider";
import { useToast } from "../user-interface/toast";
import { useMemo } from 'react';
import { useQueryclient } from './use-query-client';
import type { BaseRecord } from '../repository-provider/types';

export interface UseMutationProps {
    entity: string;
    onSuccess?: () => void;
    onError?: () => void;
}

export function useMutation<T extends Omit<BaseRecord<Record<string, unknown>>, 'id'> = Omit<BaseRecord<Record<string, unknown>>, 'id'>>({
    entity,
    onSuccess,
    onError,
}: UseMutationProps) {
    const repository = useRepository()
    const queryClient = useQueryclient()
    const notify = useToast()

    const { mutate, data, error, isPending: isLoading } = useMutationTS({
        mutationFn: async (payload: T) => {
            await repository.create({
                entity,
                payload
            })
        },
        onSuccess() {
            queryClient.invalidateQueries([entity])
            onSuccess?.()
        },
        onError() {
            if (onError) {
                onError()
            } else {
                notify({ variant: 'error', message: `Não foi possível criar novo registro de ${entity}` })
            }
        }
    })

    return useMemo(() => ({
        mutate,
        data,
        error,
        isLoading,
    }), [
        mutate,
        data,
        error,
        isLoading,
    ])
}