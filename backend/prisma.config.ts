import { resolve } from 'node:path'
import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'

config({ path: resolve(__dirname, '.env') })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // eslint-disable-next-line node/no-process-env
    url: process.env.DATABASE_URL,
  },
})
