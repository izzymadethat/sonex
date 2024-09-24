const express = require("express");
const router = express.Router();
const {
  generateAccessToken,
  restoreSessionUser,
  checkIfAuthenticated,
} = require("../utils/auth");
const apiRouter = require("./api");

// Test payloads
const userPayload = {
  _id: 123456,
  email: "myemail@email.com",
  username: "myusername",
  role: "user",
};

const clientPayload = {
  _id: 123456,
  email: "myemail@email.com",
};

router.use(restoreSessionUser); // All routes to retrieve user/client from jwt
router.use("/api", apiRouter);

// Test routes
router.get("/generateToken", (req, res) => {
  console.log("Generating token...");
  try {
    const accessToken = generateAccessToken(res, userPayload, "verification");
    const refreshToken = generateAccessToken(res, userPayload, "refresh");
    res.json({ message: "Tokens generated", accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/generateClientToken", (req, res) => {
  console.log("Generating client token...");
  const accessToken = generateAccessToken(res, clientPayload, "verification");
  const refreshToken = generateAccessToken(res, clientPayload, "refresh");
  res.json({ message: "Tokens generated", accessToken, refreshToken });
});

router.get("/restore", restoreSessionUser, (req, res) => {
  const client = req.client;
  const user = req.user;
  res.json({ user, client });
});

router.get(
  "/protected",
  restoreSessionUser,
  checkIfAuthenticated,
  (req, res) => {
    res.send("You are authenticated");
  }
);

// Routes not found
router.use((_req, _res, next) => {
  const err = new Error("Resource Not found");
  err.status = 404;
  err.title = "Resource Not found";
  err.errors = {
    message: "The requested resource could not be found",
  };
  next(err);
});

module.exports = router;
