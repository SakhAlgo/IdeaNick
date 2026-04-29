import { cloudinaryUploadTypes } from '@ideanick/shared/cloudinary'
import { getKeysAsArray } from '@ideanick/shared/getKeysAsArray'
import { z } from 'zod'

export const zPrepareCloudinaryUploadTrpcInput = z.object({
  type: z.enum(getKeysAsArray(cloudinaryUploadTypes)),
})
