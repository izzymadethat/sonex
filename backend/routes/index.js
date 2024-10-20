const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

// ==== Error handling ==== //

// Routes not found
router.use((_req, _res, next) => {
  const err = new Error("Resource Not found");
  err.status = 404;
  err.title = "Resource Not found";
  err.errors = {
    message: "The requested resource could not be found"
  };
  next(err);
});

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

// Final error route that formats the error and sends all errors
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
