const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const clientRoutes = require("./clients");

// TODO: Write logic to handle client authentication (nodemailer)

router.use(requireAuth);
router.use("/:userId/clients", clientRoutes);

module.exports = router;
