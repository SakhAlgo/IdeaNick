import { sharedEnv } from './env'
export const cloudinaryUploadTypes = {
  avatar: {
    folder: 'avatars',
    transformation: 'w_400,h_400,c_fill',
    format: 'png',
    presets: {
      small: 'w_200,h_200,c_fill',
      big: 'w_400,h_400,c_fill',
    },
  },
  image: {
    folder: 'images',
    transformation: 'w_1000,h_1000,c_limit',
    format: 'jpg',
    presets: {
      preview: 'w_200,h_200,c_fit,q_80',
      large: 'w_1000,h_1000,c_limit,q_80',
    },
  },
}
const getCloudinaryUrl = () => {
  const cloudName = sharedEnv.CLOUDINARY_CLOUD_NAME
  return `https://res.cloudinary.com/${cloudName}/image/upload`
}
export const getCloudinaryUploadUrl = (publicId, typeName, presetName) => {
  const type = cloudinaryUploadTypes[typeName]
  const preset = type.presets[presetName]
  return `${getCloudinaryUrl()}/${preset}/${publicId}`
}
export const getAvatarUrl = (publicId, preset) =>
  publicId
    ? getCloudinaryUploadUrl(publicId, 'avatar', preset)
    : getCloudinaryUploadUrl('v1777418732/avatar-placeholder', 'avatar', preset)
// https://res.cloudinary.com/dz6prxy0r/image/upload/v1777418732/avatar-placeholder.avif
//# sourceMappingURL=cloudinary.js.map
