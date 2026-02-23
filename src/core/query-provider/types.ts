export interface QueryClient {
    invalidateQueries(queryKey: string[]): void
}