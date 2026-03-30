import { zNickRequired, zStringMin, zStringRequired } from '@ideanick/shared/zod'
import { z } from 'zod'

export const zCreateIdeaTrpcInput = z.object({
  name: zStringRequired,
  nick: zNickRequired,
  description: zStringRequired,
  text: zStringMin(10),
})
