import _ from 'lodash'
import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'

export const getideasTrpcRoute = trpc.procedure.query(() => {
  return { ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'description'])) }
})
