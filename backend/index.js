if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { port, mongodb, environment } = require("./config");
const methodOverride = require("method-override");
const isProduction = environment === "production";
const multer = require("multer");
const routes = require("./routes");
const cors = require("cors")

// Initialize app
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// TODO: Security middleware
app.use(cors({
  origin: "http://localhost:5173"
}))

app.use(routes);

// Error handling

// Check for multer errors
app.use((err, _req, _res, next) => {
  if (err instanceof multer.MulterError) {
    err.status = 400;
    err.message = err.code;
    next(err);
  } else {
    next(err);
  }
});

// Error formatting
app.use((err, _req, res, _next) => {
  err.status = err.status || 500;
  err.title = err.title || "Server Error";
  err.message = err.message || "Something went wrong. Internal server error.";
  err.errors = err.errors || { server: err.message };

  const error = {
    title: err.title,
    errors: err.errors,
    status: err.status,
    message: err.message,
    timestamp: new Date().toLocaleString(),
  };

  console.error(error);

  if (isProduction) {
    res.status(err.status).json(error);
  } else {
    // Add the stack trace in development and debug mode
    error.stack = err.stack;
    res.status(err.status).json(error);
  }
});

// Start server after database connection
mongoose
  .connect(mongodb.dbURI)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is now running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
