const { S3Client } = require("@aws-sdk/client-s3")

// Main S3 Client
exports.s3Client = new S3Client();
