import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

export const createAppContext = () => {
  // eslint-disable-next-line node/no-process-env
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })
  return {
    prisma,
    stop: async () => await prisma.$disconnect(),
  }
}

export type AppContext = ReturnType<typeof createAppContext>
