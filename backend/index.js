if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
