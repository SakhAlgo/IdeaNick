import { pick } from '@ideanick/shared/pick'
import { type User } from '@prisma/client'

export const toClientMe = (user: User | null) => {
  return user && pick(user, ['id', 'nick', 'name', 'email', 'permissions'])
}
