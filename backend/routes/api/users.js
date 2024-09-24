const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const mongoose = require("mongoose");
const handleValidationErrors = require("../../utils/validation");
const { authenticatedUsersOnly } = require("../../utils/auth");
const User = require("../../models/user");
const Client = require("../../models/client");

// Validation middleware
const validateClientInput = [
  check("name")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please enter a valid email address"),
  handleValidationErrors,
];

// Add a new client to user
router.post(
  "/:userId/clients",
  authenticatedUsersOnly,
  validateClientInput,
  async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const userId = req.params.userId;
      const { name, email } = req.body;
      const client = new Client({
        name: name || null,
        email,
      });

      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { clients: client._id } },
        { new: true, session }
      );

      if (!updatedUser) {
        await session.abortTransaction();
        return res.status(404).json({ message: "User not found" });
      }

      client.users.push(userId);
      await client.save({ session });
      await session.commitTransaction();
      session.endSession();

      res.json(client);
    } catch (error) {
      await session.abortTransaction();
      next(error);
    } finally {
      session.endSession();
    }
  }
);

// Get all clients for user
// GET /api/users/:userId/clients
router.get("/:userId/clients", async (req, res, next) => {
  const userId = req.params.userId;
  // TODO: Add query params for email and/or name
  try {
    // Find all clients where the users array contains the userId
    // remove users from the response
    const clients = await Client.find({ users: userId });
    const results = clients.map((client) => {
      return {
        _id: client._id,
        name: client.name,
        email: client.email,
        projects: client.projects,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
      };
    });
    res.json({ Clients: results });
  } catch (error) {
    next(error);
  }
});

// router.use(requireAuth);
// router.use("/:userId/clients", clientRoutes);

module.exports = router;
