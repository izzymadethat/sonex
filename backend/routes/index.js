const express = require("express");
const router = express.Router();
const apiRouter = require("./api");
const multer = require("multer");
const MongoServerError = require("mongoose");
const { environment } = require("../config");
const { restoreUser } = require("../utils/auth");
const isProduction = environment === "production";

router.use(restoreUser);

router.get("/api/csrf/restore", (req, res) => {
  // const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  return res.json({ token: csrfToken });
});

router.use("/api", apiRouter);

// Set backend to serve static assets in production
if (isProduction) {
  const path = require("path");
  // Generate a csrf token api routes
  router.get("/", (req, res) => {
    // res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });

  // Serve static assets
  router.use(express.static(path.resolve("../frontend/dist")));

  // Generate a csrf token for non-API routes
  router.get(/^(?!\/?api).*/, (req, res) => {
    // res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });

  // If in development mode,
  // everything works as normal,
  // just automatically generate for each request
  // but don't send as a response, only cookie
  if (!isProduction) {
    router.get("/api/csrf/restore", (req, res) => {
      // res.cookie("XSRF-TOKEN", req.csrfToken());
      return res.json({});
    });
  }
}

// ==== Error handling ==== //

// Routes not found
router.use((_req, _res, next) => {
  const err = new Error("Resource Not found");
  err.status = 404;
  err.title = "Resource Not found";
  err.errors = {
    message: "The requested resource could not be found"
  };
  return next(err);
});

router.use((err, _req, _res, next) => {
  // Check for multer errors
  if (err instanceof multer.MulterError) {
    err.status = 400;
    err.errors = { fileUploadError: err.message };
    err.message = err.code;
    return next(err);
  }

  // Check for MongoDB errors
  if (err.code === 11000) {
    err.status = 422;
    err.title = "Duplicate key error";
    err.message = "Username or email already exists.";
    const fields = Object.keys(err.keyValue);
    err.errors = { duplicateCredentials: fields };
    return next(err);
  }
  next(err);
});

// Final error route that formats the error and sends all errors
router.use((err, _req, res, _next) => {
  err.status = err.status || 500;
  err.title = err.title || "Server Error";
  err.message = err.message || "Something went wrong. Internal server error.";
  err.errors = err.errors || { server: err.message };

  const error = {
    title: err.title,
    errors: err.errors,
    status: err.status,
    message: err.message,
    timestamp: new Date().toLocaleString()
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

module.exports = router;
