const express = require("express");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../../../utils/auth");
const User = require("../../../models/user");
const router = express.Router();

const userDB = [
  {
    _id: 12345,
    firstName: "Izzy",
    lastName: "Vickers",
    bio: "This is my bio",
    username: "izzy@me.com",
    password: "password1",
  },
];

// Login a user
// POST /api/auth/session
router.post("/", async (req, res, next) => {
  const user = req.body;
  const userFound = userDB.find((usr) => usr.username === user.username);

  if (!userFound) {
    res.status(401).json({ message: "User does not exist" });
  }

  if (!(await bcrypt.compare(user.password, userFound.password))) {
    res.status(401).json({ message: "Incorrect credentials" });
  }

  //   const token = generateAccessToken(res, user, "refresh");

  res.send({ userFound });
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

    console.log("New user created:", newUser);

    const newUserPayload = {
      ...newUser._doc,
      role: "user",
    };

    await newUser.save();

    console.log("New user created:", newUserPayload);

    generateAccessToken(res, newUser, "verification");

    res.send({ user: newUserPayload });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
