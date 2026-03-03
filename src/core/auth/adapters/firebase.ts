import { type FirebaseApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";

import type { AuthProvider, User } from "../types";
import { error } from "@/core/utils/logger";



const SETUP_TIMEOUT = 1000 * 5

export class FirebaseAuth implements AuthProvider {
    private auth: ReturnType<typeof getAuth>
    constructor(app: FirebaseApp) {
        this.auth = getAuth(app);
    }

    setup = async () => {
        await Promise.all([
            setPersistence(this.auth, browserLocalPersistence),
            new Promise<void>(((resolve, reject) => {
                onAuthStateChanged(this.auth, () => { resolve() });
                setTimeout(() => {
                    reject()
                }, SETUP_TIMEOUT)
            }))
        ])
    }

    login = async ({ email, password }: { email: string, password: string }): Promise<User> => {
        try {
            const { user } = await signInWithEmailAndPassword(this.auth, email, password)
            return user as unknown as User
        } catch (e) {
            error(e)
            throw e
        }
    }

    logout = async (): Promise<void> => {
        await signOut(this.auth)
    }

    register = async ({ email, password }: { email: string, password: string }): Promise<User> => {
        console.log({ email, password })
        try {
            const { user } = await createUserWithEmailAndPassword(this.auth, email, password)
            return user as unknown as User
        } catch (e) {
            error(e)
            throw e
        }
    }

    getCurrentUser = async (): Promise<User> => {
        const user = this.auth.currentUser;
        if (user) {
            return {
                id: user.uid,
                email: user.email!
            }
        }
        throw new Error('Nao ha usuario logado')
    }
}