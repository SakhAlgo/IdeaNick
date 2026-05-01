export declare const cloudinaryUploadTypes: {
    avatar: {
        folder: string;
        transformation: string;
        format: string;
        presets: {
            small: string;
            big: string;
        };
    };
    image: {
        folder: string;
        transformation: string;
        format: string;
        presets: {
            preview: string;
            large: string;
        };
    };
};
type CloudinaryUploadTypes = typeof cloudinaryUploadTypes;
export type CloudinaryUploadTypeName = keyof CloudinaryUploadTypes;
export type CloudinaryUploadPresetName<TTypeName extends CloudinaryUploadTypeName> = keyof CloudinaryUploadTypes[TTypeName]['presets'];
export declare const getCloudinaryUploadUrl: <TTypeName extends CloudinaryUploadTypeName>(publicId: string, typeName: TTypeName, presetName: CloudinaryUploadPresetName<TTypeName>) => string;
export declare const getAvatarUrl: (publicId: string | null | undefined, preset: keyof CloudinaryUploadTypes["avatar"]["presets"]) => string;
export {};
