import { useParams as useReactRouterParams } from 'react-router-dom'
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
  pumpedGetRoute.useParams = useReactRouterParams
  return pumpedGetRoute
}
export const pgr = pumpGetRoute
//# sourceMappingURL=pumpGetRoute.js.map
