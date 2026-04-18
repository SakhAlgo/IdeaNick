import cors from 'cors'
import debug from 'debug'
import express from 'express'
import { applyCron } from './lib/cron'
import { AppContext, createAppContext } from './lib/ctx'
import { env } from './lib/env'
import { logger } from './lib/logger'
import { applyPassportToExpressApp } from './lib/passport'
import { initSentry } from './lib/sentry'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'
import { presetDb } from './scripts/presetBD'

if (env.DEBUG) {
  debug.enable(env.DEBUG)
}
// debug.enable(env.DEBUG)

void (async () => {
  let ctx: AppContext | null = null
  try {
    initSentry()
    ctx = createAppContext()
    await presetDb(ctx)
    const expressApp = express()
    expressApp.use(cors())

    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })
    applyPassportToExpressApp(expressApp, ctx)
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
    applyCron(ctx)
    expressApp.use((error: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
      logger.error('express', error)
      if (res.headersSent) {
        next(error)
        return
      }
      res.status(500).send('Internal server error')
    })
    expressApp.listen(env.PORT, () => {
      logger.info('express', 'Listening at https://localhost:' + env.PORT)
    })
  } catch (e) {
    logger.error('app', e as Error)
    await ctx?.stop()
  }
})()
