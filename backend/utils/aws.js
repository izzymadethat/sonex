import { awsS3 } from "../config";
import { s3Client } from "../config/aws-s3.config";
const { GetObjectCommand } = require(`@aws-sdk/client-s3`);

exports.generatePresignedUrl = async (fileKey) => {
  const command = s3Client.send(
    new GetObjectCommand({
      Bucket: awsS3.bucketName,
      Key: fileKey
    })
  );
};
