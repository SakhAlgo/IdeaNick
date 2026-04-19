type PumpedGetRouteInputBase = {
    abs?: boolean;
};
declare function pumpGetRoute<T extends Record<string, boolean>>(routeParamsDefinition: T, getRoute: (routeParams: Record<keyof T, string>) => string): {
    (routeParams: Record<keyof T, string> & PumpedGetRouteInputBase): string;
    placeholders: Record<keyof T, string>;
    useParams: () => Record<keyof T, string>;
    definition: string;
};
declare function pumpGetRoute(getRoute: () => string): {
    (routeParams?: PumpedGetRouteInputBase): string;
    placeholders: {};
    useParams: () => {};
    definition: string;
};
export type RouteParams<T extends {
    placeholders: Record<string, string>;
}> = T['placeholders'];
export declare const pgr: typeof pumpGetRoute;
export {};
