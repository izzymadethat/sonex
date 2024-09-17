const router = require("express").Router();
const sessionRouter = require("./session");
const authRouter = require("./auth");
const projectsRouter = require("./projects");

router.use("/session", sessionRouter);
router.use("/auth", authRouter);
router.use("/projects", projectsRouter);

module.exports = router;
