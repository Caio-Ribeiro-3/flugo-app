import type { MountRouteStrategy, Route } from "./types"

export function mountRoutes<T>(routes: Route[], strategy: MountRouteStrategy<T>) {
    return strategy(routes)
}