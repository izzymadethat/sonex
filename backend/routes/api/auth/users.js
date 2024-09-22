const router = require("express").Router();
// const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
// const { checkAuth, checkNotAuth, requireAuth } = require("../../utils/auth");
const Client = require("../../models/client");
const {
  generateAccessToken,
  saveRefreshToken,
  generateAndSaveRefreshToken,
} = require("../../utils/clientAuth");
const jwt = require("jsonwebtoken");
const { clientAuth } = require("../../config");

let maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

// test login page ("/api/auth/login")
router.get("/login", checkNotAuth, (req, res) => {
  res.render("login");
});

// test register page ("/api/auth/register")
router.get("/register", checkNotAuth, (req, res) => {
  res.render("register");
});

// Login with email and password
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/api/auth/login",
  })
);

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
  return res.json(req.user);
});

// Register with email and password
router.post("/register", async (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;

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

    const hashedPassword = await bcrypt.hashSync(password, 10);
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

      return res.json(user);
    });
  } catch (error) {
    next(error);
  }
});

// Logout
router.delete("/logout", (req, res, next) => {
  req.logOut((error) => {
    if (error) return next(error);
    res.status(200).json({ message: "User logged out successfully" });
  });
});

/**
 * =====================================
 * Client Authentication
 * =====================================
 */

router.post("/clients/verify", async (req, res, next) => {
  const { accessToken } = req.body;
  if (!accessToken) {
    return res.json({
      message: "Token is required",
    });
  }

  try {
    // verify access token
    const decoded = jwt.verify(accessToken, clientAuth.accessSecret);
    const client = await Client.findById(decoded.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.isVerified = true;
    await client.save();

    // generate refresh token
    const refreshToken = jwt.sign(
      { email: client.email, id: client._id },
      clientAuth.refreshSecret,
      {
        expiresIn: "30d",
      }
    );

    // save refresh token

    const savedRefreshToken = await saveRefreshToken(
      client._id,
      refreshToken,
      maxAge
    );

    console.log(savedRefreshToken);

    // send refresh token (http-only)
    res.cookie("clientRefreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: maxAge,
    });

    res.status(200).json({ message: "Client verified" });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Reverify clients created but not verified
router.post("/clients/reverify", async (req, res, next) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  try {
    const client = await Client.findOne({ email, name });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    if (client.isVerified) {
      return res.status(400).json({ message: "Client already verified" });
    }

    const accessToken = generateAccessToken(client);
    // TODO: create resend email

    res.status(200).json({ message: "Verification email resent." });
  } catch (error) {
    next(error);
  }
});

router.post("/clients/refresh", async (req, res, next) => {
  const refreshToken = req.cookies.clientRefreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, clientAuth.refreshSecret);
    const client = await Client.findById(decoded.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const newRefreshToken = generateAndSaveRefreshToken(
      client._id,
      refreshToken,
      maxAge
    );

    res.cookie("clientRefreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: maxAge,
    });

    res.status(200).json({ message: "Refreshed token" });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
