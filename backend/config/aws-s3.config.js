const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;
const { awsS3 } = require("./index");

// exports.uploadToS3 = async (files, projectId) => {
//   const s3 = new S3();

//   // support multiple file upload
//   const params = files.map((file) => {
//     return {
//       Bucket: awsS3.bucketName,
//       Key: `uploads/${projectId}/${uuid()}-${file.originalname}`,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//     };
//   });

//   return await Promise.all(params.map((param) => s3.upload(param).promise()));
// };

// exports.uploadToS3 = async (files, projectId) => {
//   const s3 = new S3Client();
//   // support multiple file upload
//   const params = files.map((file) => {
//     return {
//       Bucket: awsS3.bucketName,
//       Key: `uploads/${projectId}/${uuid()}-${file.originalname}`,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//     };
//   });

//   const uploadResults = await Promise.all(
//     params.map((param) => s3.send(new PutObjectCommand(param)))
//   );

//   // Construct and return the S3 object URLs along with results
//   const s3Results = uploadResults.map((result, index) => {
//     const objectUrl = `https://${awsS3.bucketName}.s3.${awsS3.region}.amazonaws.com/${params[index].Key}`;
//     return { ...result, objectUrl };
//   });

//   return s3Results;
// };

// Main S3 Client
exports.s3Client = new S3Client();
