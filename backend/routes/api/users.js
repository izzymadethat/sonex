const express = require("express");
const router = express.Router();
const { check, query } = require("express-validator");
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
  handleValidationErrors
];

// Add a new client to user
router.post("/:userId/clients", validateClientInput, async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.params.userId;
    const { name, email } = req.body;
    const client = new Client({
      name: name || null,
      email
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
});

// Get all clients for user
// GET /api/users/:userId/clients

const validateQuery = [
  query("page")
    .exists({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .toInt(),
  query("size")
    .exists({ checkFalsy: true })
    .isInt({ min: 10, max: 75 })
    .withMessage("Size must be a positive integer")
    .toInt(),
  handleValidationErrors
];
router.get("/:userId/clients", validateQuery, async (req, res, next) => {
  const userId = req.params.userId;
  const { page, size } = req.query;

  try {
    // Find all clients where the users array contains the userId
    // remove users from the response
    const clients = await Client.find({ users: userId })
      .skip((page - 1) * size)
      .limit(size)
      .select("-users")
      .lean();

    const totalClients = await Client.countDocuments({ users: userId });

    res.json({
      Clients: clients,
      total: totalClients,
      page,
      size,
      totalPages: Math.ceil(totalClients / size)
    });
  } catch (error) {
    next(error);
  }
});

// router.use(requireAuth);
// router.use("/:userId/clients", clientRoutes);

module.exports = router;
