import { getId } from "@/core/utils/get-id";
import type { AuthProvider, User } from "../types";

export class MockAuthProvider implements AuthProvider {
    private isLoggedIn = false
    private storage: User[] = [
        {
            id: getId(),
            email: 'teste@teste.com'
        }
    ]

    setup = () => {
        return Promise.resolve()
    }

    login = async ({ email, password }: { email: string, password: string }): Promise<User> => {
        const newUser = { id: getId(), email, password }
        this.storage.push(newUser)
        this.isLoggedIn = true

        return newUser
    }

    logout = async (): Promise<void> => {
        this.isLoggedIn = false

    }

    register = async ({ email }: { email: string, password: string }): Promise<User> => {
        const user = this.storage.find(el => el.email === email)
        if (!user) throw new Error('Usuario nao registrado')
        return user
    }

    getCurrentUser = async (): Promise<User> => {
        if (this.isLoggedIn) {
            return this.storage[0]
        }
        throw new Error('Usuario nao logado')
    }
}