const express = require("express");
const router = express.Router();
const Client = require("../../models/client");
const { checkIfAuthenticated } = require("../../utils/auth");
const mongoose = require("mongoose");

router.get("/:clientId", async (req, res, next) => {
  const clientId = req.params.clientId;
  const userId = req.user.id.toString();
  try {
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (!client.users.includes(userId)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to view this client" });
    }

    res.json(client);
  } catch (error) {
    next(error);
  }
});

// Update a client
// PUT /api/clients/:clientId
// Only the actual client or client.users can update the client
router.put("/:clientId", checkIfAuthenticated, async (req, res, next) => {
  const clientId =
    (req.client && req.client._id.toString()) || req.params.clientId;
  const userId = req.user.id.toString();
  const { name, email } = req.body;

  try {
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Only the actual client or client.users can update the client
    if (client._id.toString() !== clientId && !client.users.includes(userId)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to update this client" });
    }

    client.name = name || client.name;
    client.email = email || client.email;

    await client.save();
    res.json(client);
  } catch (error) {
    next(error);
  }
});

router.delete("/:clientId", checkIfAuthenticated, async (req, res, next) => {
  const clientId = req.params.clientId;
  const userId = req.user.id.toString();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const client = await Client.findById(clientId).session(session);

    // Check if client exists
    if (!client) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Client not found" });
    }

    // Check if the client belongs to the user
    if (!client.users.includes(userId)) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this client" });
    }

    // Remove client from the user's clients array
    await User.updateOne(
      { _id: userId },
      { $pull: { clients: clientId } },
      { session }
    );

    // Remove client from all projects' clients arrays
    await Project.updateMany(
      { clients: clientId },
      { $pull: { clients: clientId } },
      { session }
    );

    // Delete the client
    await Client.findByIdAndDelete(clientId).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    next(error);
  } finally {
    // End session
    session.endSession();
  }
});

module.exports = router;
