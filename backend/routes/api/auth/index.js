const router = require("express").Router();
const sessionRouter = require("./session");

// API Route: /api/auth
// Session refers to users
router.use("/", sessionRouter);


module.exports = router;
