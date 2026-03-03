import type { BaseRecord } from "../repository-provider/types"

export type User = BaseRecord<{
    email: string;
}>

export type AuthProvider = {
    login(payload: { email: string, password: string }): Promise<User>;
    logout(): Promise<void>;
    register(payload: { email: string, password: string }): Promise<User>
    getCurrentUser(): Promise<User>;
    setup(): Promise<void>
}

export const IDENTITY = 'auth'