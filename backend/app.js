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
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  methods: ["GET", "POST", "PUT", "DELETE"]
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
app.use(
  session({
    name: sessionAuth.cookieKey,
    secret: sessionAuth.accessSecret,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: mongodb.dbURI,
      ttl: 60 * 60 * 24 * 30 * 1000 // 30 days
    }),
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "lax",
      maxAge: 60 * 60 * 24 * 30 * 1000 // 30 days
    }
  })
); // Session auth middleware
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "lax"
    }
  })
); // CSRF protection
app.use(routes);

module.exports = app;
