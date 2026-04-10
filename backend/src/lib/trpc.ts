import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { type Express } from 'express'
import { type TrpcRouter } from '../router'
import { type ExpressRequest } from '../utils/types'
import { type AppContext } from './ctx'
import { env } from './env'
import { ExpectedError } from './error'
import { logger } from './logger'

export const getTrpcContext = ({ appContext, req }: { appContext: AppContext; req: ExpressRequest }) => ({
  ...appContext,
  me: req.user || null,
})

const getCreateTrpcContext =
  (appContext: AppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) =>
    getTrpcContext({ appContext, req: req as ExpressRequest })
type TrpcContext = Awaited<ReturnType<ReturnType<typeof getCreateTrpcContext>>>

export const trpc = initTRPC.context<TrpcContext>().create({
  errorFormatter: ({ shape, error }) => {
    const isExpected = error.cause instanceof ExpectedError
    return {
      ...shape,
      data: {
        ...shape.data,
        isExpected,
      },
    }
  },
})

export const createTrpcRouter = trpc.router

export const trpcLoggedProcedure = trpc.procedure.use(
  trpc.middleware(async (opts) => {
    const { path, type, next, ctx, getRawInput } = opts

    const start = Date.now()

    const result = await next()

    const durationMs = Date.now() - start

    const meta = {
      path,

      type,

      userId: ctx.me?.id || null,

      durationMs,

      rawInput: (await getRawInput()) || null,
    }

    if (result.ok) {
      logger.info(`trpc:${opts.type}:success`, 'Successfull request', { ...meta, output: result.data })
    } else {
      logger.error(`trpc:${opts.type}:error`, result.error, meta)
    }

    return result
  })
)

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
