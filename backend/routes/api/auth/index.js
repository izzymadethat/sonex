const router = require("express").Router();
const userAuthRouter = require("./users");
const clientAuthRouter = require("./clients");
const sessionRouter = require("./session");
const { generateAccessToken } = require("../../../utils/auth");

// API Route: /api/auth/<users | clients>

router.use("/session", sessionRouter);
router.use("/users", userAuthRouter);
router.use("/clients", clientAuthRouter);

module.exports = router;
