const router = require("express").Router();
const clientAuthRouter = require("./clients");
const sessionRouter = require("./session");

// API Route: /api/auth/<session | clients>
// Session refers to users
router.use("/session", sessionRouter);
router.use("/clients", clientAuthRouter);

module.exports = router;
