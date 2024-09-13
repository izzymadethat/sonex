if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const routes = require("./routes");

const PORT = process.env.PORT || 8001;
const DB = process.env.MONGODB_URI;
const isProduction = process.env.NODE_ENV === "production";

// Initialize app
const app = express();

// Connect to MongoDB
// TODO: add to config folder
mongoose.connect(DB);
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

// Security middleware

// Test route
app.get("/", (req, res) => {
  res.send("Sonex Backend Server Up and Running!");
});

app.use(routes);

// Error handling
app.use((err, _req, res) => {
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
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
