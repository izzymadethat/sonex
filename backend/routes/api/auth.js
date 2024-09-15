const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { checkAuth, checkNotAuth, requireAuth } = require("../../utils/auth");

// test login page ("/api/auth/login")
router.get("/login", checkNotAuth, (req, res) => {
  res.render("login");
});

// test register page ("/api/auth/register")
router.get("/register", checkNotAuth, (req, res) => {
  res.render("register");
});

// Login with email and password
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      err.timeStamp = Date.now();
      err.message = "Login failed. Please try again.";
      err.status = 401;
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        timestamp: Date.now(),
        message: "Unauthorized user.",
      });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.redirect("/");
    });

    // res.status(200).json({ user });
  })(req, res, next);
});

// Login with Google
router.get(
  "/login/google",
  checkNotAuth,
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// Callback route for Google
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

// Register with email and password
router.post("/register", async (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;
  const salt = await bcrypt.genSalt(10);

  if (!firstName || !lastName || !email || !username || !password) {
    return res.status(400).json({
      errorMessage: "Please enter all fields",
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        errorMessage: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      username: username.replace(/\s+/g, "").toLowerCase(),
      hashedPassword,
    }).save();

    req.login(user, (error) => {
      if (error) return next(error);
      console.log("User created and logged in: ", user);

      return res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
});

// Logout
router.delete("/logout", (req, res, next) => {
  req.logOut((error) => {
    if (error) return next(error);
    res.redirect("/api/auth/login");
  });
});

module.exports = router;
