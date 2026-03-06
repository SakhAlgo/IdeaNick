import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(async ({ ctx, input }) => {
  const exIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (exIdea) {
    throw new Error('Nick already exists')
  }
  await ctx.prisma.idea.create({
    data: {
      nick: input.nick,
      name: input.name,
      description: input.description,
      text: input.text,
    },
  })
  return true
})
