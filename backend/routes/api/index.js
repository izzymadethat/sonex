const router = require("express").Router();
const authRouter = require("./auth");
const projectsRouter = require("./projects");
const usersRouter = require("./users");

router.use("/auth", authRouter);
router.use("/projects", projectsRouter);
router.use("/users", usersRouter);

module.exports = router;
