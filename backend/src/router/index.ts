import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { signInTrpcRoute } from './auth/signIn'
import { signUpTrpcRoute } from './auth/signUp'
import { updateProfileTrpcRoute } from './auth/updateProfile'
import { createIdeaTrpcRoute } from './ideas/createIdea'
import { getIdeaTrpcRoute } from './ideas/getIdea'
import { getIdeasTrpcRoute } from './ideas/getIdeas'
import { updateIdeaTrpcRoute } from './ideas/updateIdea'
import { getMeTrpcRoute } from './other/getMe'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  getMe: getMeTrpcRoute,
  // @endindex
})
export type TrpcRouter = typeof trpcRouter

export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
