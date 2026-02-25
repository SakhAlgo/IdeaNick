import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

const ideas = _.times(100, (i) => ({
  nick: `nick ${i}`,
  name: `Idea ${i}`,
  description: `Description ${i}`,
  text: _.times(10, (j) => `<p>Text paragraf ${j}</p>`).join(' '),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    // throw new Error("Not implemented")
    return { ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'description'])) }
  }),
  getIdea: trpc.procedure
    .input(
      z.object({
        ideaNick: z.string(),
      })
    )
    .query(({ input }) => {
      const idea = ideas.find((idea) => idea.nick === input.ideaNick)
      return { idea: idea || null }
    }),
})
export type TrpcRouter = typeof trpcRouter
