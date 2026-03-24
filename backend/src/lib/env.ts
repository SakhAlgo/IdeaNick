import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const zEnv = z.object({
  DATABASE_URL: z.string().trim().min(1),
  PORT: z.string().trim().min(1),
  JWT_SECRET: z.string().trim().min(1),
  NODE_ENV: z.string().trim().min(1).default('development'),
  PASSWORD_SALT: z.string().trim().min(1),
  INITIAL_ADMIN_PASSWORD: z.string().trim().min(1),
  WEBAPP_URL: z.string().trim().min(1),
  EMAIL_SERVICE_API_KEY: z.string().trim().min(1),
  FROM_EMAIL_NAME: z.string().trim().min(1),
  FROM_EMAIL_ADDRESS: z.string().trim().min(1).email(),
})

// eslint-disable-next-line node/no-process-env
export const env = zEnv.parse(process.env)
