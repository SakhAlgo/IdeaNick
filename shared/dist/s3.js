'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getS3UploadUrl = exports.getS3UploadName = void 0
const s3Url = process.env.VITE_S3_URL || process.env.S3_URL
const getS3UploadName = (path) => {
  const filename = path.replace(/^.*[\\/]/, '')
  const parts = filename.split('-')
  parts.shift()
  return parts.join('-')
}
exports.getS3UploadName = getS3UploadName
const getS3UploadUrl = (s3Key) => {
  return `${s3Url}/${s3Key}`
}
exports.getS3UploadUrl = getS3UploadUrl
//# sourceMappingURL=s3.js.map
