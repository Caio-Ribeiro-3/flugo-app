export interface QueryClient {
    invalidateQueries(queryKey: (string | object)[]): void
    getQuery<T>(queryKey: (string | object)[]): T | undefined
}