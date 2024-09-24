const router = require("express").Router();
const authRouter = require("./auth");
const projectsRouter = require("./projects");
const usersRouter = require("./users");
const clientsRouter = require("./clients");

router.use("/auth", authRouter);
router.use("/projects", projectsRouter);
router.use("/users", usersRouter);
router.use("/clients", clientsRouter);

module.exports = router;
