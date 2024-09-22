const router = require("express").Router();
const userAuthRouter = require("./users");
const clientAuthRouter = require("./clients");

// API Route: /api/auth/<users | clients>

router.use("/users", userAuthRouter);
router.use("/clients", clientAuthRouter);