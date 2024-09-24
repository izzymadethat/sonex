const express = require("express");
const router = express.Router();
const Client = require("../../models/client");
const {
  authenticatedUsersOnly,
  checkIfAuthenticated,
} = require("../../utils/auth");

router.get("/:clientId", authenticatedUsersOnly, async (req, res, next) => {
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
  try {
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (!client.users.includes(userId)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this client" });
    }

    await Client.findByIdAndDelete(clientId);
    res.json({ message: "Client deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
