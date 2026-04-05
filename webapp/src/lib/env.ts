import { zEnvHost, zEnvNonemptyTrimmedRequiredOnNotLocal } from '@ideanick/shared/zod'
import { z } from 'zod'

export const zEnv = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  HOST_ENV: zEnvHost,
  VITE_BACKEND_TRPC_URL: z.string().trim().min(1),
  VITE_WEBAPP_URL: z.string().trim().min(1),
  VITE_WEBAPP_SENTRY_DSN: zEnvNonemptyTrimmedRequiredOnNotLocal,
})
// eslint-disable-next-line node/no-process-env
export const env = zEnv.parse(process.env)
