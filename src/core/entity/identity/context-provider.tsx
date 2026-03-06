import { createContext, useContext } from "react";



export const EntityContext = createContext<string | undefined>(undefined)

export const useEntity = () => {
    return useContext(EntityContext)!
}