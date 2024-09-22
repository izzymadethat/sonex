const express = require("express");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../../../utils/auth");
const User = require("../../../models/user");
const router = express.Router();

// Login a user
// POST /api/auth/session
router.post("/", async (req, res, next) => {
  const { credentials, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: credentials }, { email: credentials }],
    });

    if (
      !user ||
      !bcrypt.compareSync(password, user.hashedPassword.toString())
    ) {
      const error = new Error("Invalid credentials");
      error.title = "Login failed";
      err.errors = { login: "Invalid credentials" };
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
    console.log("User:", user.password);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    console.log(hashedPassword);

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

module.exports = router;
