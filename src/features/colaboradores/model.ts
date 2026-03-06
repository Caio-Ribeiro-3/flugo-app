import type { BaseRecord } from "@/core/repository-provider/types";
import { validateEmail } from "@/core/utils/validate-email";

export interface Colaborador extends BaseRecord {
    avatar: string;
    name: string;
    email: string;
    status: boolean;
    role: string;
    jobTitle: string;
    admissionDate: Date;
    seniority: 'junior' | 'pleno' | 'senior' | 'gestor';
    manager?: string;
    baseWage: number;
}

export const IDENTITY = 'colaboradores'

export const SENIORITY: Colaborador['seniority'][] = ['junior', 'pleno', 'senior', 'gestor']


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
        return !value ? 'Voce deve escolher um departamento' : undefined
    },
    status: (value: unknown) => {
        if (typeof value !== 'boolean') return 'Valor inválido para status'
    },
    jobTitle: (value: unknown) => {
        if (typeof value !== 'string') return 'Valor inválido para cargo'
        return !value ? 'Voce deve digitar um cargo' : value.length < 5 ? 'Um cargo deve ter ao menos 5 caracteres' : undefined
    },
    admissionDate: (value: unknown) => {
        if (!(value instanceof Date)) return 'Valor inválido para data'
    },
    seniority: (value: unknown) => {
        if (typeof value !== 'string') return 'Valor inválido para senioridade'
        return !SENIORITY.includes(value as typeof SENIORITY[number]) ? 'Voce deve digitar uma senioridade valida' : undefined
    },
    manager: (value: unknown) => {
        if (value === undefined || value === '') return undefined
        if (typeof value !== 'string') return 'Valor inválido para gestor'
        return !value ? 'Voce deve escolher um gestor' : undefined
    },
    baseWage: (value: unknown) => {
        if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) return 'Valor inválido para salario base'
        return value < 0 ? 'Voce deve digitar um salario base maior que 0' : undefined
    }
}