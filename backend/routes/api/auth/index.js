const router = require("express").Router();
const clientAuthRouter = require("./client");
const sessionRouter = require("./session");

// API Route: /api/auth/<session | clients>
// Session refers to users
router.use("/session", sessionRouter);
router.use("/client", clientAuthRouter);

module.exports = router;
