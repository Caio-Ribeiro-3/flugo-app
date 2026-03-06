// @ts-nocheck: Trocamos a tipagem forte do @tanstack/react-router por flexibilidade e adapters
import { createRootRoute, createRoute } from "@tanstack/react-router"

import { getId } from "@/core/utils/get-id"
import { Authenticated } from "@/core/auth/authenticated"
import { NotFound } from "@/core/user-interface/404"

import type { MountRouteStrategy, Route } from "../types"
import { SimpleLayout } from "@/core/user-interface/simple-layout"

type CreateRootRouteResult = ReturnType<typeof createRootRoute>
type CreateRouteResult = ReturnType<typeof createRoute>

export const tanstackRouterAdapter: MountRouteStrategy<any> = (routes) => {
    function recursivelyCreateFinalRouter(_routes: Route[], parent?: CreateRootRouteResult | CreateRouteResult): CreateRouteResult[] {
        let actualParent: CreateRootRouteResult | CreateRouteResult = parent!
        if (!actualParent) {
            actualParent = createRootRoute({
                notFoundComponent: () => {
                    return (
                        <SimpleLayout>
                            <NotFound />
                        </SimpleLayout>
                    )
                },
            })
            actualParent.addChildren(recursivelyCreateFinalRouter(routes, actualParent))
            return actualParent
        }

        const children: CreateRouteResult[] = []

        for (let i = 0; i < _routes.length; i++) {
            const route = _routes[i]
            const createRoutePayload = {
                component: route.requiredAuthentication ? () => (
                    <Authenticated>
                        <route.Component />
                    </Authenticated>
                ) : route.Component,
                getParentRoute: () => actualParent,
                notFoundComponent: () => {
                    return (
                        <NotFound />
                    )
                },
            }
            let path = '/'
            if (route.path) {
                path = route.path.replace(':', '$')
                createRoutePayload.path = path
            } else if (route.pathless) {
                createRoutePayload.id = getId()
            }
            const newRoute = createRoute(createRoutePayload)
            if (_routes[i].children?.length) {
                newRoute.addChildren(recursivelyCreateFinalRouter(_routes[i].children || [], newRoute))
            }
            children.push(newRoute)
        }

        return children
    }

    return recursivelyCreateFinalRouter(routes)
}