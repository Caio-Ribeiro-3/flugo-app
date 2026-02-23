export type Route = {
    path?: string;
    pathless?: boolean;
    Component: any;
    children?: Route[];
}

export type MountRouteStrategy<T> = {
    (routes: Route[], parent?: Route): T
}