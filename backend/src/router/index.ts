import { trpc } from '../lib/trpc'
import { getIdeaTrpcRoute } from './getidea'
import { getIdeasTrpcRoute } from './getideas'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
})
export type TrpcRouter = typeof trpcRouter
