// @ts-nocheck: Trocamos a tipagem forte do @tanstack/react-router por flexibilidade e adapters
import { createRootRoute, createRoute } from "@tanstack/react-router"
import type { MountRouteStrategy, Route } from "../types"

type CreateRootRouteResult = ReturnType<typeof createRootRoute>
type CreateRouteResult = ReturnType<typeof createRoute>

export const tanstackRouterAdapter: MountRouteStrategy<any> = (routes) => {
    function recursivelyCreateFinalRouter(_routes: Route[], parent?: CreateRootRouteResult | CreateRouteResult): CreateRouteResult[] {
        let actualParent: CreateRootRouteResult | CreateRouteResult = parent!
        if (!actualParent) {
            actualParent = createRootRoute()
            actualParent.addChildren(recursivelyCreateFinalRouter(routes, actualParent))
            return actualParent
        }

        const children: CreateRouteResult[] = []

        for (let i = 0; i < _routes.length; i++) {
            const route = _routes[i]
            const createRoutePayload = {
                component: route.Component,
                getParentRoute: () => actualParent,
            }
            if (route.path) {
                createRoutePayload.path = route.path
            } else if (route.pathless) {
                createRoutePayload.id = 'teste'
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