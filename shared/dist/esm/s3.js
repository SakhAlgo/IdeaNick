import { sharedEnv } from './env';
export const getS3UploadName = (path) => {
    const filename = path.replace(/^.*[\\/]/, '');
    const parts = filename.split('-');
    parts.shift();
    return parts.join('-');
};
export const getS3UploadUrl = (s3Key) => {
    return `${sharedEnv.S3_URL}/ideanick/${s3Key}`;
};
//# sourceMappingURL=s3.js.map