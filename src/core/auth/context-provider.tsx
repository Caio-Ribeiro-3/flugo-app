import { createContext, useContext, type PropsWithChildren } from "react";

import { type AuthProvider } from "./types";


export const AuthProviderContext = createContext<AuthProvider | undefined>(undefined)

export const AuthContextProvider = ({ authProvider, children }: PropsWithChildren<{ authProvider: AuthProvider }>) => {
    return (
        <AuthProviderContext.Provider value={authProvider}>
            {children}
        </AuthProviderContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthProviderContext)!
}