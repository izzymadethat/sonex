const { verify } = require("jsonwebtoken");
const { sessionAuth } = require("../config");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    const error = new Error("User not logged in");
    error.status = 401;
    error.title = "Unauthorized User";
    return next(error);
  }

  try {
    const validToken = verify(accessToken, sessionAuth.accessSecret);
    if (!validToken) {
      const error = new Error("Invalid access token");
      error.status = 401;
      error.title = "Unauthorized User";
      return next(error);
    }

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validateToken };
