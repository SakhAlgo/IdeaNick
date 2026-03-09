import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { type Express } from 'express'
import { type TrpcRouter } from '../router'
import { type AppContext } from './ctx'

export const trpc = initTRPC.context<AppContext>().create()

export const applyTrpcToExpressApp = (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  )
  if (process.env.NODE_ENV !== 'production') {
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
