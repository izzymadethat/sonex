require("dotenv").config();

module.exports = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
  mongodb: {
    dbURI: process.env.MONGODB_URI,
  },
  port: process.env.PORT || 8001,

  environment: process.env.NODE_ENV || "development",
  session: {
    cookieSecret: process.env.COOKIE_SECRET,
  },
  awsS3: {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_REGION,
  },
};
