if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { environment } = require("./config");
const isProduction = environment === "production";
const routes = require("./routes");
const cors = require("cors");
const csurf = require("csurf");

// Initialize app
const app = express();

// Security middleware for each request
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};
const csurfOptions = {
  cookie: true,
  secure: isProduction,
  sameSite: isProduction && "lax"
};
app.use(cors(corsOptions)); // Allow cross-origin requests from localhost:5173
app.use(csurf(csurfOptions)); // CSRF protection

// Middlewares for each request
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(routes);

module.exports = app;
