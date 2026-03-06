
import { useParams as useParamsTS } from "@tanstack/react-router"

type Select<T> = {
    (state: Partial<T>): Partial<T>
}

export const useParams = <T>(select: Select<T>) => {
    // @ts-expect-error
    const params = useParamsTS({
        from: '',
        select,
    })
    return params as Partial<T>
}