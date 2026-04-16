import fs from 'fs'
import { validateHeaderName } from 'http'
import path from 'path'
import { zEnvNonemptyTrimmed, zEnvNonemptyTrimmedRequiredOnNotLocal } from '@ideanick/shared/zod'
import * as dotenv from 'dotenv'
import { z } from 'zod'

// dotenv.config()

const zNoneemptyTrimmed = z.string().trim().min(1)
const zNoneemptyTrimmedRequiredOnNotLocal = zNoneemptyTrimmed
  .optional()
  // eslint-disable-next-line node/no-process-env
  .refine(() => process.env.HOST_ENV === 'local' || !!validateHeaderName, 'Required on local host')

const findEnvFilePath = (dir: string): string | null => {
  const maybeEnvFilePath = path.join(dir, '.env')
  if (fs.existsSync(maybeEnvFilePath)) {
    return maybeEnvFilePath
  }
  if (dir === '/') {
    return null
  }
  return findEnvFilePath(path.dirname(dir))
}
const envFilePath = findEnvFilePath(__dirname)
if (envFilePath) {
  dotenv.config({ path: envFilePath, override: true })
  // eslint-disable-next-line node/no-process-env
  dotenv.config({ path: `${envFilePath}.${process.env.NODE_ENV}`, override: true })
}

const zEnv = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production']),
  HOST_ENV: z.enum(['local', 'production']),
  DATABASE_URL: zEnvNonemptyTrimmed.refine((val) => {
    // eslint-disable-next-line node/no-process-env
    if (process.env.NODE_ENV !== 'test') {
      return true
    }
    const [databaseUrl] = val.split('?')
    const [databaseName] = databaseUrl.split('/').reverse()
    return databaseName.endsWith('-test')
  }, `Data base name should ends with "-test" on test environment`),
  PORT: zNoneemptyTrimmed,
  JWT_SECRET: zNoneemptyTrimmed,
  PASSWORD_SALT: zNoneemptyTrimmed,
  INITIAL_ADMIN_PASSWORD: zNoneemptyTrimmed,
  WEBAPP_URL: zNoneemptyTrimmed,
  EMAIL_SERVICE_API_KEY: zNoneemptyTrimmedRequiredOnNotLocal,
  FROM_EMAIL_NAME: zNoneemptyTrimmed,
  FROM_EMAIL_ADDRESS: zNoneemptyTrimmed.email(),
  DEBUG: z
    .string()
    .optional()
    .refine(
      // eslint-disable-next-line node/no-process-env
      (val) => process.env.HOST_ENV === 'local' || process.env.NODE_ENV !== 'production' || (!!val && val.length > 0),
      'Required on not local host on production'
    ),
  BACKEND_SENTRY_DSN: zEnvNonemptyTrimmedRequiredOnNotLocal,
  SOURCE_VERSION: zEnvNonemptyTrimmedRequiredOnNotLocal,
})

// eslint-disable-next-line node/no-process-env
export const env = zEnv.parse(process.env)
