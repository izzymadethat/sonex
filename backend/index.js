if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8001;
const DB = process.env.MONGODB_URI;

// Initialize app
const app = express();

// Connect to MongoDB
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

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
