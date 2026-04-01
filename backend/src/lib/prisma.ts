import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { logger } from './logger'

dotenv.config()
export const createPrismaClient = () => {
  // eslint-disable-next-line node/no-process-env
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({
    adapter,
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'info',
      },
    ],
  })

  prisma.$on('query', (e) => {
    logger.info('prisma:low:query', 'Successfull request', {
      query: e.query,
      duration: e.duration,
      // eslint-disable-next-line node/no-process-env
      params: process.env.HOST_ENV === 'local' ? e.params : '***',
    })
  })

  prisma.$on('info', (e) => {
    logger.info('prisma:low:info', e.message)
  })

  const extendedPrisma = prisma.$extends({
    client: {},
    query: {
      $allModels: {
        $allOperations: async ({ model, operation, args, query }) => {
          const start = Date.now()
          try {
            const result = await query(args)
            const durationMs = Date.now() - start
            logger.info('prisma:high', 'Successfull request', { model, operation, args, durationMs })
            return result
          } catch (error) {
            const durationMs = Date.now() - start
            logger.error('prisma:high', error, { model, operation, args, durationMs })
            throw error
          }
        },
      },
    },
  })

  return extendedPrisma
}
