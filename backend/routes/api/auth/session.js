const express = require("express");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../../../utils/auth");
const User = require("../../../models/user");
const router = express.Router();

// Get current user
// GET /api/auth/session
router.get("/", (req, res) => {
  const user = req.user;
  res.json({ user });
});

// Login a user
// POST /api/auth/session
router.post("/", async (req, res, next) => {
  const { credential, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: credential }, { email: credential }],
    });

    if (
      !user ||
      !bcrypt.compareSync(password, user.hashedPassword.toString())
    ) {
      const error = new Error("Invalid credentials");
      error.title = "Login failed";
      error.errors = { login: "Invalid credentials" };
      error.status = 401;
      return next(error);
    }

    const userPayload = {
      ...user._doc,
      role: "user",
    };

    delete userPayload.hashedPassword;

    generateAccessToken(res, userPayload, "refresh");

    res.json({ user: userPayload });
  } catch (error) {
    next(error);
  }
});

// Signup a user
// POST /api/auth/session/register
router.post("/register", async (req, res, next) => {
  const user = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    const newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      bio: user.bio,
      hashedPassword,
    });

    await newUser.save();

    const newUserPayload = {
      ...newUser._doc,
      role: "user",
    };

    delete newUserPayload.hashedPassword;

    generateAccessToken(res, newUserPayload, "verification");

    res.send({ user: newUserPayload });
  } catch (error) {
    next(error);
  }
});

// Logout a user
// DELETE /api/auth/session
router.delete("/", (_req, res) => {
  res.clearCookie("sessionToken");
  res.json({ message: "Logout successful" });
});

module.exports = router;
