import { trpc } from '../../lib/trpc'
import { getPasswordHash } from '../utils/getPasswordHash'
import { zSignUpTrpcInput } from './input'

export const signInTrpsRoute = trpc.procedure.input(zSignUpTrpcInput).mutation(async ({ ctx, input }) => {
  const user = await ctx.prisma.user.findFirst({
    where: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  })

  if (!user) {
    throw new Error('Wrong nick or password')
  }
  return true
})
