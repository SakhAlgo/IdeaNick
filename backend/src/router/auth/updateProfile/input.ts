import { zNickRequired } from '@ideanick/shared/zod'
import { z } from 'zod'

export const zUpdateProfileTrpcInput = z.object({
  nick: zNickRequired,
  avatar: z.string().nullable(),

  name: z.string().max(50).default(''),
})
