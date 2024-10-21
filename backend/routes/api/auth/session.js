const express = require("express");
const { check } = require("express-validator");
const handleValidationErrors = require("../../../utils/validation");
const bcrypt = require("bcryptjs");
const User = require("../../../models/user");
const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Valid username or email is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors
];

// Get current user
// GET /api/auth/session
router.get("/", (req, res) => {
  const user = req.session.user || null;
  res.json({ user });
});

// Login a user
// POST /api/auth/session
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  try {
    // Try to find user by username or email
    const user = await User.findOne({
      $or: [{ username: credential }, { email: credential }]
    });

    if (!user) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login Failed";
      err.errors = {
        login: "Couldn't find user with that username or email"
      };
      return next(err);
    }

    // check if password is correct
    // If so, login the user and generate session token
    // If not, return error message
    bcrypt.compare(
      password,
      user.hashedPassword.toString(),
      async (err, isMatch) => {
        // Server error
        if (err) {
          return next(err);
        }

        // Password is incorrect
        if (!isMatch) {
          const err = new Error("Login failed");
          err.status = 401;
          err.title = "Login Failed";
          err.errors = {
            login: "The provided credentials were invalid."
          };
          return next(err);
        }

        const loggedInUser = {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          username: user.username,
          role: "user"
        };

        // Add user to express session
        req.session.user = loggedInUser;

        return res.status(200).json({ user: loggedInUser });
      }
    );
  } catch (error) {
    next(error);
  }
});

// Signup a user
// POST /api/auth/session/register
router.post("/register", async (req, res, next) => {
  const incomingUser = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);

    // Hash password with salt then create new user
    bcrypt.hash(incomingUser.password, salt, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      const newUserInfo = {
        firstName: incomingUser.firstName,
        lastName: incomingUser.lastName,
        username: incomingUser.username,
        email: incomingUser.email,
        hashedPassword
      };

      const newUser = new User(newUserInfo);
      await newUser.save();

      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    });
  } catch (error) {
    next(error);
  }
});

// Logout a user
// DELETE /api/auth/session
router.delete("/", (req, res) => {
  // Destroy the user's auth session (removes "sonex_session_id" from cookies, not csrf token)
  req.session.destroy();
  res.json({ message: "Logout successful" });
});

module.exports = router;
