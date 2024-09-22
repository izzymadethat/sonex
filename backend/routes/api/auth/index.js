const router = require("express").Router();
const userAuthRouter = require("./users");
const clientAuthRouter = require("./clients");
const { generateAccessToken } = require("../../../utils/auth");

// API Route: /api/auth/<users | clients>

router.use("/users", userAuthRouter);
router.use("/clients", clientAuthRouter);

module.exports = router;
