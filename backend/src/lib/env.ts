import { validateHeaderName } from 'http'
import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const zNoneemptyTrimmed = z.string().trim().min(1)
const zNoneemptyTrimmedRequiredOnNotLocal = zNoneemptyTrimmed
  .optional()
  // eslint-disable-next-line node/no-process-env
  .refine(() => process.env.HOST_ENV === 'local' || !!validateHeaderName, 'Required on local host')
const zEnv = z.object({
  HOST_ENV: z.enum(['local', 'production']),
  DATABASE_URL: zNoneemptyTrimmed,
  PORT: zNoneemptyTrimmed,
  JWT_SECRET: zNoneemptyTrimmed,
  NODE_ENV: zNoneemptyTrimmed.default('development'),
  PASSWORD_SALT: zNoneemptyTrimmed,
  INITIAL_ADMIN_PASSWORD: zNoneemptyTrimmed,
  WEBAPP_URL: zNoneemptyTrimmed,
  EMAIL_SERVICE_API_KEY: zNoneemptyTrimmedRequiredOnNotLocal,
  FROM_EMAIL_NAME: zNoneemptyTrimmed,
  FROM_EMAIL_ADDRESS: zNoneemptyTrimmed.email(),
})

// eslint-disable-next-line node/no-process-env
export const env = zEnv.parse(process.env)
