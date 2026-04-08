'use strict'
// const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
//   return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
// }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getNewIdeaRoute =
  exports.getEditIdeaRoute =
  exports.getViewIdeaRoute =
  exports.getAllIdeasRoute =
  exports.getEditProfileRoute =
  exports.getSignOutRoute =
  exports.getSignInRoute =
  exports.getSignUpRoute =
    void 0
// export const getAllIdeasRoute = () => '/'
// export const viewIdeaRouteParams = getRouteParams({ ideaNick: true })
// export type ViewIdeaRouteParams = typeof viewIdeaRouteParams
// export const getNewIdeaRoute = () => '/ideas/new-idea'
// export const getViewIdeaRoute = ({ ideaNick }: ViewIdeaRouteParams) => `/ideas/${ideaNick}`
// export const getSignUpRoute = () => '/signup'
// export const getSignInRoute = () => '/signin'
// export const getEditProfileRoute = () => '/edit-profile'
// export const getSignOutRoute = () => '/signout'
// export const editIdeaRouteParams = getRouteParams({ ideaNick: true })
// export type EditIdeaRouteParams = typeof viewIdeaRouteParams
// export const getEditIdeaRoute = ({ ideaNick }: EditIdeaRouteParams) => `/ideas/${ideaNick}/edit`
const 
pumpGetRoute_js_1 = require('./utils/pumpGetRoute.js')
exports.getSignUpRoute = (0, pumpGetRoute_js_1.pgr)(() => '/sign-up')
exports.getSignInRoute = (0, pumpGetRoute_js_1.pgr)(() => '/sign-in')
exports.getSignOutRoute = (0, pumpGetRoute_js_1.pgr)(() => '/sign-out')
exports.getEditProfileRoute = (0, pumpGetRoute_js_1.pgr)(() => '/edit-profile')
exports.getAllIdeasRoute = (0, pumpGetRoute_js_1.pgr)(() => '/')
exports.getViewIdeaRoute = (0, pumpGetRoute_js_1.pgr)({ ideaNick: true }, ({ ideaNick }) => `/ideas/${ideaNick}`)
exports.getEditIdeaRoute = (0, pumpGetRoute_js_1.pgr)({ ideaNick: true }, ({ ideaNick }) => `/ideas/${ideaNick}/edit`)
exports.getNewIdeaRoute = (0, pumpGetRoute_js_1.pgr)(() => '/ideas/new')
//# sourceMappingURL=routes.js.map
