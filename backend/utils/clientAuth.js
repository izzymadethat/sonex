const jwt = require("jsonwebtoken");
const { clientAuth } = require("../config");
const RefreshToken = require("../models/refresh-token");
const bcrypt = require("bcryptjs");
const Client = require("../models/client");

exports.generateAccessToken = (client) => {
  return jwt.sign(
    { email: client.email, id: client._id },
    clientAuth.accessSecret,
    {
      expiresIn: "30m",
    }
  );
};

exports.generateAndSaveRefreshToken = async (clientId) => {
  const refreshToken = jwt.sign({}, clientAuth.refreshSecret, {
    expiresIn: "30d", // or whatever time period you want
  });
  const hashedToken = await bcrypt.hash(refreshToken, 10);
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 30);

  const newRefreshToken = await new RefreshToken({
    token: hashedToken,
    clientId,
    expireDate,
    s,
  }).save();

  // add refresh token to client
  const client = await Client.findById(clientId);
  client.refreshTokens.push(newRefreshToken._id);
  await client.save();

  return newRefreshToken;
};

exports.verifyRefreshToken = async (clientId, refreshToken) => {
  const storedRefreshToken = await RefreshToken.findOne({
    clientId,
    isValid: true,
  });

  if (!storedRefreshToken) {
    return false;
  }

  const isMatch = await bcrypt.compare(refreshToken, storedRefreshToken.token);
  if (!isMatch) {
    return false;
  }

  if (storedRefreshToken.expireDate < new Date()) {
    storedRefreshToken.isValid = false;
    await storedRefreshToken.save();
    return false;
  }

  return true;
};

exports.clientAuthMiddleware = async (req, res, next) => {
  const accessToken = req.headers["authorization"];
  if (!accessToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify access token
    const decoded = jwt.verify(accessToken, clientAuth.accessSecret);
    const client = await Client.findById(decoded.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    req.client = client; // Add client info to request
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Access token expired, check for refresh token
      const refreshToken = req.cookies.clientRefreshToken;
      if (!refreshToken) {
        return res.status(403).json({ message: "No refresh token provided" });
      }

      const isValidRefresh = await verifyRefreshToken(
        req.client._id,
        refreshToken
      );
      if (!isValidRefresh) {
        return res
          .status(403)
          .json({ message: "Invalid or expired refresh token" });
      }

      // Generate new access token
      const newAccessToken = jwt.sign(
        { id: req.client._id, email: req.client.email },
        clientAuth.accessSecret,
        { expiresIn: "30m" }
      );

      res.setHeader("Authorization", `Bearer ${newAccessToken}`);
      next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};
