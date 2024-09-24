const router = require("express").Router();
const authRouter = require("./auth");
const projectsRouter = require("./projects");
const usersRouter = require("./users");
const clientsRouter = require("./clients");
const commentsRouter = require("./comments");

router.use("/auth", authRouter);
router.use("/projects", projectsRouter);
router.use("/users", usersRouter);
router.use("/clients", clientsRouter);
router.use("/comments", commentsRouter);

module.exports = router;
