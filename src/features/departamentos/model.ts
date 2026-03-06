import type { BaseRecord } from "@/core/repository-provider/types";

export type Departamento = BaseRecord<{
    name: string;
    employees: string[];
    owner: string;
}>


export const IDENTITY = 'departamentos'

export const departamentValidator = {
    name: (value: unknown) => {
        if (typeof value !== 'string') return 'Valor inválido para nome'
        return !value ? 'Voce deve digitar um nome' : undefined
    },
    employees: (value: unknown) => {
        if (!Array.isArray(value) || !value.every(el => typeof el === 'string')) return 'Valor inválido para colaboradores'
    },
    owner: (value: unknown) => {
        if (value === undefined) return undefined
        if (typeof value !== 'string') return 'Valor inválido para gestor'
        return !value ? 'Voce deve escolher um gestor' : undefined
    },
}