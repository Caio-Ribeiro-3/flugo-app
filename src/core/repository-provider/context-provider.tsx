import { createContext, useContext } from "react";
import type { RepositoryProvider } from "./types";

export const RepositoryContext = createContext<RepositoryProvider | undefined>(undefined)

export const useRepository = () => {
    const context = useContext(RepositoryContext)
    if (!context) throw new Error(`useRepository deve ser usado dentro de um RepositoryContext.Provider.`)
    return context
}