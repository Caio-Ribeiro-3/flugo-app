import { memo } from "react";

import { createRouter, RouterProvider } from "@tanstack/react-router";

import { mountRoutes } from "./mount-routes";
import { type Route } from "./types";
import { tanstackRouterAdapter } from "./adapters/tanstack-router";



interface RoutingProviderProps {
    routes: Route[]
}

export const Routes = memo(({ routes }: RoutingProviderProps) => {
    const frameworkRoutes = mountRoutes(routes, tanstackRouterAdapter)!
    return (
        <RouterProvider
            router={(
                createRouter({
                    routeTree: frameworkRoutes,
                    defaultPreload: 'intent',
                    scrollRestoration: true,
                })
            )}
        />
    )
})