// Authentication middlewares to check if user is logged in
// and authorized

// TODO: set up authentication middleware

// check if user is logged in
exports.requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  const err = new Error("Unauthorized User");
  err.status = 401;
  err.errors = {
    unauthorized: "Unauthorized User. Please log in to continue.",
  };
  err.title = "Unathorized User";

  next(err);
};

// check if user authenticated
// middleware to check if user is authenticated
// for protected routes
exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/api/auth/login");
};

// check if user is NOT authenticated
// middleware to prevent user from re-authenticating themselves
exports.checkNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
};
