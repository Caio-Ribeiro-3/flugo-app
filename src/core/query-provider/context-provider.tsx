import { type PropsWithChildren } from 'react'

import {
    QueryClient as QueryClientTS,
    QueryClientProvider,
} from '@tanstack/react-query'


const DEFAULT_QUERY_CLIENT = new QueryClientTS()

export const QueryContext = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={DEFAULT_QUERY_CLIENT}>
            {children}
        </QueryClientProvider>
    )
}