import type { BaseRecord } from "@/core/repository-provider/types";

export type Departamento = BaseRecord<{
    name: string;
    employees: string[];
    manager: string;
}>


export const IDENTITY = 'departamentos'