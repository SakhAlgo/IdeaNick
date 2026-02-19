import { initTRPC } from '@trpc/server'

const ideas = [
  { nick: 'nick 1', name: 'Name 1', description: 'lorem 1' },
  { nick: 'nick 2', name: 'Name 2', description: 'lorem 2' },
  { nick: 'nick 3', name: 'Name 3', description: 'lorem 3' },
]

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    // throw new Error("Not implemented")
    return { ideas }
  }),
})

export type TrpcRouter = typeof trpcRouter