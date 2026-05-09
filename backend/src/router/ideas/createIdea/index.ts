import { ExpectedError } from '../../../lib/error'
import { trpcLoggedProcedure } from '../../../lib/trpc'
import { zCreateIdeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpcLoggedProcedure.input(zCreateIdeaTrpcInput).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error('Unauthenticated')
  }
  const exIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (exIdea) {
    throw new ExpectedError('Idea is blocked by administrator')
  }
  await ctx.prisma.idea.create({
    data: {
      name: input.name,
      nick: input.nick,
      description: input.description,
      text: input.text,
      images: input.images,
      certificate: input.certificate,
      documents: input.documents,
      author: { connect: { id: ctx.me.id } },
    },
  })
  return true
})
