const router = require("express").Router();
const authRouter = require("./auth");
const projectsRouter = require("./projects");

router.use("/auth", authRouter);
router.use("/projects", projectsRouter);

module.exports = router;
