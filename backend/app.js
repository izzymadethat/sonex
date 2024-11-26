const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { environment } = require("./config");
const isProduction = environment === "production";
const routes = require("./routes");
const cors = require("cors");
const helmet = require("helmet");
const csurf = require("csurf");

// Initialize app
const app = express();
// Middlewares for each request
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security and authentication middleware for each request
if (!isProduction) {
	app.use(cors());
}

app.use(
	helmet.crossOriginResourcePolicy({
		policy: "cross-origin",
	})
); // Adds security in headers

app.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && "Lax",
			httpOnly: true,
		},
	})
); // JWT Auth middleware
app.use(routes);

module.exports = app;
