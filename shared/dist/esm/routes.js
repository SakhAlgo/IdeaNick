// const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
//   return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
// }
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
import { pgr } from './utils/pumpGetRoute.js'
export const getSignUpRoute = pgr(() => '/sign-up')
export const getSignInRoute = pgr(() => '/sign-in')
export const getSignOutRoute = pgr(() => '/sign-out')
export const getEditProfileRoute = pgr(() => '/edit-profile')
export const getAllIdeasRoute = pgr(() => '/')
export const getViewIdeaRoute = pgr({ ideaNick: true }, ({ ideaNick }) => `/ideas/${ideaNick}`)
export const getEditIdeaRoute = pgr({ ideaNick: true }, ({ ideaNick }) => `/ideas/${ideaNick}/edit`)
export const getNewIdeaRoute = pgr(() => '/ideas/new')
//# sourceMappingURL=routes.js.map
