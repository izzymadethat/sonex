if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const { port, mongodb, environment } = require("./config");
const passportSession = require("./config/passport.config");
const passport = require("passport");
const session = require("express-session");
const config = require("./config");

const isProduction = environment === "production";

// Initialize app
const app = express();

// set up test view engine
app.set("view engine", "ejs");

// Connect to MongoDB
// TODO: add to config folder
mongoose.connect(mongodb.dbURI);
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.once("open", () => {
  console.log("Connected to database");
});

// Middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: config.session.cookieSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
    },
  })
);

// run authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// Security middleware

// Test route
app.get("/", (req, res) => {
  console.log(req.session);
  res.send("Sonex Backend Server Up and Running!");
});

app.use(routes);

// Error handling
app.use((err, _req, res, next) => {
  console.log(err);
  err.status = err.status || 500;
  err.title = err.title || "Server Error";
  err.message = err.message || "Something went wrong. Internal server error.";
  err.errors = err.errors || { server: [err.message] };

  const error = {
    title: err.title,
    errors: err.errors,
    status: err.status,
    message: err.message,
  };

  if (isProduction) {
    res.status(err.status).json(error);
  } else {
    // Add the stack trace in development and debug mode
    error.stack = err.stack;
    res.json(error);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
