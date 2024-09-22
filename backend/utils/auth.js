/**
 * ===========================
 * Auth Utils
 * ===========================
 *
 * This file handles all authentication related functions for both
 * users and clients. This will be helpful in authorizing clients and users
 * when there are protected routes.
 *
 * generateAccessToken(user: User | Client, sessionType: stringm expiresIn: string): void
 * - Generate and sends an overall access token for the user or client based on the sessionType
 * - Serves as a function to be called in the login and signup route
 * - The expiresIn can be set to "15m", "1h", "1d", etc. as it's passed to the jwt.sign() method
 * - If expiresIn is not passed, it will default to 15 minutes
 * - The access token is stored in the browser as a cookie
 *
 *
 * restoreUser(req: Request, res: Response, next: NextFunction): Promise<User | Client | null>
 * - Restores the user or client from the jwt and
 *   attaches it to the request object as req.user or req.client
 * - This is passed to all routers as a middleware to access the user or client at any point
 * - If the jwt is invalid or the user/client not found, it will return null
 *
 * - verifyToken(token: string): Promise<User | Client | null>
 * - Verifies the token and returns the user or client
 * - This is used in the restoreUser function to verify the token
 * - If the token is invalid or the user/client not found, it will return null
 *
 */

const jwt = require("jsonwebtoken");
const { sessionAuth, environment } = require("../config");

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

  // Set the expiresIn based on the session type
  expiresIn =
    sessionType === "verification" ? accessExpiresIn : refreshExpiresIn;

  const token = jwt.sign({ data: payload }, sessionSecret, { expiresIn });

  res.cookie("sessionToken", token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
}
