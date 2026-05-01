"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatarUrl = exports.getCloudinaryUploadUrl = exports.cloudinaryUploadTypes = void 0;
const cloudinaryCloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryUrl = `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload`;
exports.cloudinaryUploadTypes = {
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
};
const getCloudinaryUploadUrl = (publicId, typeName, presetName) => {
    const type = exports.cloudinaryUploadTypes[typeName];
    const preset = type.presets[presetName];
    return `${cloudinaryUrl}/${preset}/${publicId}`;
};
exports.getCloudinaryUploadUrl = getCloudinaryUploadUrl;
const getAvatarUrl = (publicId, preset) => publicId
    ? (0, exports.getCloudinaryUploadUrl)(publicId, 'avatar', preset)
    : (0, exports.getCloudinaryUploadUrl)('v1777418732/avatar-placeholder', 'avatar', preset);
exports.getAvatarUrl = getAvatarUrl;
// https://res.cloudinary.com/dz6prxy0r/image/upload/v1777418732/avatar-placeholder.avif
//# sourceMappingURL=cloudinary.js.map