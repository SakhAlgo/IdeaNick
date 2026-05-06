"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgr = void 0;
/* eslint-disable import/order */
const env_1 = require("../env");
const react_router_dom_1 = require("react-router-dom");
function pumpGetRoute(routeParamsOrGetRoute, maybeGetRoute) {
    const routeParamsDefinition = typeof routeParamsOrGetRoute === 'function' ? {} : routeParamsOrGetRoute;
    const getRoute = typeof routeParamsOrGetRoute === 'function' ? routeParamsOrGetRoute : maybeGetRoute;
    const placeholders = Object.keys(routeParamsDefinition).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {});
    const definition = getRoute(placeholders);
    const pumpedGetRoute = (routeParams) => {
        const route = getRoute(routeParams);
        if (routeParams?.abs) {
            return `${env_1.sharedEnv.WEBAPP_URL}${route}`;
        }
        else {
            return route;
        }
    };
    pumpedGetRoute.placeholders = placeholders;
    pumpedGetRoute.definition = definition;
    pumpedGetRoute.useParams = react_router_dom_1.useParams;
    return pumpedGetRoute;
}
exports.pgr = pumpGetRoute;
//# sourceMappingURL=pumpGetRoute.js.map