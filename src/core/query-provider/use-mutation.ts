import { useMemo } from 'react';

import {
    useMutation as useMutationTS,
} from '@tanstack/react-query'

export interface UseMutationProps<Return, Payload> {
    onSuccess?: () => void;
    onError?: () => void;
    mutationFunction: (payload: Payload) => Promise<Return>;
    mutationKey: (string | object)[]
}

export function useMutation<Return, Payload>({
    onSuccess,
    onError,
    mutationFunction,
    mutationKey
}: UseMutationProps<Return, Payload>) {

    const { mutateAsync: mutate, data, error, isPending: isLoading } = useMutationTS<Return, void, Payload>({
        mutationFn: (payload) => mutationFunction(payload),
        onSuccess,
        onError,
        mutationKey
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