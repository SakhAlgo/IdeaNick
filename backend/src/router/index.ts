import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getideaTrpcRoute } from './getidea'
import { getideasTrpcRoute } from './getideas'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getidea: getideaTrpcRoute,
  getideas: getideasTrpcRoute,
  // @endindex
})
export type TrpcRouter = typeof trpcRouter
