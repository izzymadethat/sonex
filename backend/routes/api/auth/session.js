const express = require("express");
const { generateAccessToken } = require("../../../utils/auth");
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

  if (userFound.password !== user.password) {
    res.status(401).json({ message: "Incorrect credentials" });
  }

  //   const token = generateAccessToken(res, user, "refresh");

  res.send({ user });
});

module.exports = router;
