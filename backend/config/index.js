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

  environment: {
    NODE_ENV: process.env.NODE_ENV || "development",
  },
  session: {
    cookieSecret: process.env.COOKIE_SECRET,
  },
};
