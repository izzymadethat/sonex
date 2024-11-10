/**
 * ===========================
 * Auth Utils
 * ===========================
 *
 * This file handles all authentication related functions for both
 * users and clients. This will be helpful in authorizing clients and users
 * when there are protected routes.
 *
 *
 *
 */

// TODO: This may not be needed when passport arrives
exports.restoreUser = (req, res, next) => {
  next();
};

exports.checkIfAuthenticated = (req, _res, next) => {
  if (!req.session.user && !req.session.client) {
    const error = new Error("Authentication required");
    error.status = 401;
    error.errors = {
      message: "You must be logged in to access this route"
    };

    return next(error);
  }

  return next();
};
