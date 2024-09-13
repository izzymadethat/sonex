const router = require("express").Router();
const sessionRouter = require("./session");
const authRouter = require("./auth");

router.use("/session", sessionRouter);
router.use("/auth", authRouter);

module.exports = router;
