'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.pgr = void 0
const react_router_dom_1 = require('react-router-dom')
const baseUrl = process.env.VITE_WEBAPP_URL || process.env.WEBAPP_URL
function pumpGetRoute(routeParamsOrGetRoute, maybeGetRoute) {
  const routeParamsDefinition = typeof routeParamsOrGetRoute === 'function' ? {} : routeParamsOrGetRoute
  const getRoute = typeof routeParamsOrGetRoute === 'function' ? routeParamsOrGetRoute : maybeGetRoute
  const placeholders = Object.keys(routeParamsDefinition).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {})
  const definition = getRoute(placeholders)
  const pumpedGetRoute = (routeParams) => {
    const route = getRoute(routeParams)
    if (routeParams?.abs) {
      return `${baseUrl}${route}`
    } else {
      return route
    }
  }
  pumpedGetRoute.placeholders = placeholders
  pumpedGetRoute.definition = definition
  pumpedGetRoute.useParams = react_router_dom_1.useParams
  return pumpedGetRoute
}
exports.pgr = pumpGetRoute
//# sourceMappingURL=pumpGetRoute.js.map
