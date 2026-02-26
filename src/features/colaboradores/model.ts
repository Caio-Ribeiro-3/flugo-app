import type { BaseRecord } from "@/core/repository-provider/types";
import { validateEmail } from "@/core/utils/validate-email";

export interface Colaborador extends BaseRecord {
    avatar: string;
    name: string;
    email: string;
    status: boolean;
    role: string;
}

export const IDENTITY = 'colaboradores'


export const DEPARTAMENTOS = ['Design', 'TI', 'Marketing', 'Produto']

export const colaboratorValidator = {
    name: (value: unknown) => {
        if (typeof value !== 'string') return 'Valor inválido para nome'
        return !value ? 'Voce deve digitar um título' : value.length < 5 ? 'Um título deve ter ao menos 5 caracteres' : undefined
    },
    email: (value: unknown) => {
        return !value ? 'Voce deve digitar um email' : validateEmail(value)
    },
    role: (value: unknown) => {
        if (typeof value !== 'string') return 'Valor inválido para departamento'
        return !value ? 'Voce deve escolher um departamento' : !DEPARTAMENTOS.includes(value) ? 'Departamento inválido' : undefined
    },
    status: (value: unknown) => {
        if (typeof value !== 'boolean') return 'Valor inválido para status'
    },
}