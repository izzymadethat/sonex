if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const { sessionAuth, environment, mongodb } = require("./config");
const isProduction = environment === "production";
const routes = require("./routes");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const session = require("express-session");

// Initialize app
const app = express();
// Middlewares for each request
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security and authentication middleware for each request
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};
// const csurfOptions = {
//   secure: isProduction,
//   sameSite: isProduction && "lax",
//   httpOnly: true,
// };
const sessionOptions = {
  name: sessionAuth.cookieKey,
  secret: sessionAuth.accessSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "lax",
    maxAge: Number(sessionAuth.accessExpiresIn) * 1000 // 30 days
  }
};
if (!isProduction) {
  app.use(cors(corsOptions)); // Allow cross-origin requests from localhost:5173
}
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      mediaSrc: ["'self'", "https://*.cloudfront.net"]
    }
  })
);
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
); // Adds security in headers
app.use(session(sessionOptions)); // Session auth middleware
// app.use(
//   csurf({
//     cookie: true
//   })
// ); // CSRF protection
app.use(routes);

module.exports = app;
