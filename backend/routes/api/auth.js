const router = require("express").Router();
const passport = require("passport");

// test login page ("/api/auth/login")
router.get("/login", (req, res) => {
  res.render("login");
});

// Login with email and password
router.post("/login", (req, res, next) => {
  res.send("Logging in with password route");
});

// Login with Google
router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback route for Google
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send(req.user);
});

// Register with email and password
router.get("/register", (req, res, next) => {
  res.send("Register route");
});

// Register with Google
router.get("/register/google", (req, res, next) => {
  res.send("Register with Google route");
});

// Logout
router.get("/logout", (req, res, next) => {
  res.send("Logout route");
});

module.exports = router;
