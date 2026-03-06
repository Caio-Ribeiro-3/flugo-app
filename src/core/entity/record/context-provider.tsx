import { createContext, useContext } from "react";

export const RecordContext = createContext<string | undefined>(undefined)

export const useRecord = () => {
    return useContext(RecordContext)!
}