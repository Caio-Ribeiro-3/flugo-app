import type { BaseRecord } from "../repository-provider/types"
import { validateEmail } from "../utils/validate-email";

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

function validatePassword(value: unknown) {
    if (typeof value !== 'string') return 'Valor invalido'
    const hasAtLeast8Chars = value.length >= 8;
    const hasLetters = /[a-zA-Z]/.test(value);
    const hasNumbers = /[0-9]/.test(value);

    return hasAtLeast8Chars && hasLetters && hasNumbers ? undefined : 'Senha invalida. Certifique-se de ter pelo menos 8 caracteres, letras e numeros';
}

export const authValidators = {
    email: (value: unknown) => {
        return !value ? 'Voce deve digitar um email' : validateEmail(value)
    },
    password: (value: unknown) => {
        return validatePassword(value)
    },
    confirmPassword: (value: unknown, password: unknown) => {
        if (value !== password) return 'Senha e confirmacao de senha nao sao iguais'
        return validatePassword(value)
    },
}