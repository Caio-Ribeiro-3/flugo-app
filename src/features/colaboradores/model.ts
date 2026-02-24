import type { BaseRecord } from "@/core/repository-provider/types";

export interface Colaborador extends BaseRecord {
    avatar: string;
    name: string;
    email: string;
    status: boolean;
    role: boolean;
}

export const IDENTITY = 'colaboradores'