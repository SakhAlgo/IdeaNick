import { z } from 'zod'
import { trpc } from '../../../lib/trpc'

export const getIdeasTrpcRoute = trpc.procedure.input(z.object({})).query(async ({ ctx }) => {
  const ideas = await ctx.prisma.idea.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return { ideas }
})
