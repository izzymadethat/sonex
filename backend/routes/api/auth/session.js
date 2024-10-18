const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../../models/user");
const { sessionAuth } = require("../../../config");
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
      $or: [{ username: credential }, { email: credential }]
    });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // check if password is correct
    // If so, login the user and generate access token
    bcrypt.compare(password, user.hashedPassword).then(async (isMatch) => {
      if (!isMatch)
        return res.json({ error: "Wrong Username and Password Combination" });

      const accessToken = jwt.sign(
        { username: user.username, id: user._id, role: "user" },
        sessionAuth.refreshSecret
      );

      res.json({ accessToken, user });
    });
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

    // Hash password with salt then create new user
    bcrypt.hash(user.password, salt).then(async (hashedPassword) => {
      const newUser = await new User({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        hashedPassword
      }).save();

      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    });
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
