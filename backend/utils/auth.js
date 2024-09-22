/**
 * ===========================
 * Auth Utils
 * ===========================
 *
 * This file handles all authentication related functions for both
 * users and clients. This will be helpful in authorizing clients and users
 * when there are protected routes.
 *
 * generateAccessToken(res: Response, user: User | Client, sessionType: string): Token: string
 * - Generate and sends an overall access token for the user or client based on the sessionType
 * - Serves as a function to be called in the login and signup route
 * - The expiresIn can be set to "15m", "1h", "1d", etc. as it's passed to the jwt.sign() method
 * - If expiresIn is not passed, it will default to 15 minutes
 * - The access token is stored in the browser as a cookie
 *
 *
 * restoreSessionUser(req: Request, res: Response, next: NextFunction): Promise<User | Client | null>
 * - Restores the user or client from the jwt and
 *   attaches it to the request object as req.user or req.client
 * - This is passed to all routers as a middleware to access the user or client at any point
 * - If the jwt is invalid or the user/client not found, it will return null
 *
 * _verifyToken(token: string): Promise<User | Client | null>
 * - Helper function verifies the token and returns the user or client
 * - This is used in the restoreUser function to verify the token
 * - If the token is invalid or the user/client not found, it will return null
 *
 */

const jwt = require("jsonwebtoken");
const { sessionAuth, environment } = require("../config");
const User = require("../models/user");
const Client = require("../models/client");

const { accessExpiresIn, refreshExpiresIn } = sessionAuth;

const isProduction = environment === "production";

function generateAccessToken(res, user, sessionType) {
  // Set payload
  const payload = {
    id: user._id.toString(),
    email: user.email,
    username: user.username || user.email,
    role: user.role || "client",
  };

  let sessionSecret;
  let expiresIn;

  // Set JWT Secret based on session type & check if the session type is valid
  if (sessionType === "verification") {
    sessionSecret = sessionAuth.accessSecret;
  } else if (sessionType === "refresh") {
    sessionSecret = sessionAuth.refreshSecret;
  } else {
    throw new Error("Invalid session type");
  }

  // Set the expiresIn based on the session type and add the session type to the payload
  expiresIn =
    sessionType === "verification" ? accessExpiresIn : refreshExpiresIn;
  payload.sessionType = sessionType;

  const token = jwt.sign({ data: payload }, sessionSecret, { expiresIn });

  res.cookie("sessionToken", token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  res.setHeader("Authorization", `Bearer ${token}`);

  return token;
}

async function restoreSessionUser(req, res, next) {
  const { sessionToken } = req.cookies;
  const token = sessionToken || req.headers.authorization?.split(" ")[1];
  req.user = null;
  req.client = null;

  if (!token) {
    return next();
  }

  const verifiedUser = await _verifyToken(token);

  if (!verifiedUser) {
    res.clearCookie("sessionToken");
    return next();
  }

  if (verifiedUser.role === "user") {
    req.user = verifiedUser;
  } else if (verifiedUser.role === "client") {
    req.client = verifiedUser;
  }

  next();
}

async function _verifyToken(token) {
  try {
    const payloadData = jwt.decode(token);
    const { data } = payloadData;
    const { sessionType } = data;

    let sessionSecret =
      sessionType === "verification" ? accessSecret : refreshSecret;

    const userPayload = jwt.verify(token, sessionSecret);

    if (userPayload.role === "user") {
      return await User.findById(userPayload.data.id);
    } else if (userPayload.role === "client") {
      return await Client.findById(userPayload.data.id);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

function checkIfAuthenticated(req, res, next) {
  if (!req.user && !req.client) {
    const error = new Error("Authentication required");
    error.status = 401;
    error.errors = {
      message: "You must be logged in to access this route",
    };

    return next(error);
  }

  return next();
}

module.exports = {
  generateAccessToken,
  restoreSessionUser,
  checkIfAuthenticated,
};
