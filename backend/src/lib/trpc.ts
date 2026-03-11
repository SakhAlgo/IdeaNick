import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { type Express } from 'express'
import { type TrpcRouter } from '../router'
import { type ExpressRequest } from '../utils/types'
import { type AppContext } from './ctx'
import { env } from './env'

const getCreateTrpcContext =
  (appContext: AppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    ...appContext,
    me: (req as ExpressRequest).user || null,
  })

type TrpcContext = Awaited<ReturnType<ReturnType<typeof getCreateTrpcContext>>>

export const trpc = initTRPC.context<TrpcContext>().create()

export const applyTrpcToExpressApp = (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: getCreateTrpcContext(appContext),
    })
  )
  if (env.NODE_ENV !== 'production') {
    expressApp.use('/panel', async (_, res) => {
      const { renderTrpcPanel } = await import('trpc-ui')
      return res.send(
        renderTrpcPanel(trpcRouter, {
          url: 'http://localhost:3000/trpc',
        })
      )
    })
  }
}
