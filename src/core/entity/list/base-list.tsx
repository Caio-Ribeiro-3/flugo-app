import { memo, type PropsWithChildren } from "react";

import { PaginationContextProvider } from "./use-pagination";
import { FilterContextProvider } from "./use-filter";
import { SortContextProvider } from "./use-sort";
import { ListContextProvider } from "./use-list";
import { ControllerProvider } from "./list-controller";


export const BaseList = memo(({ children }: PropsWithChildren) => {
    return (
        <PaginationContextProvider>
            <FilterContextProvider>
                <SortContextProvider>
                    <ListContextProvider>
                        <ControllerProvider>
                            {children}
                        </ControllerProvider>
                    </ListContextProvider>
                </SortContextProvider>
            </FilterContextProvider>
        </PaginationContextProvider>
    )
})