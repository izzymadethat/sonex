// These routes handle clients attached to users
// Routes start with /api/users/:userId/clients
// All routes are using requireAuth from the parent router
const router = require("express").Router({ mergeParams: true });
const Client = require("../../models/client");

// Create a client
// POST /api/users/:userId/clients
router.post("/", async (req, res, next) => {
  const userId = req.params.userId;
  const { firstName, email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  try {
    const client = new Client({
      firstName: firstName || null,
      email,
    });

    client.users.push(userId);

    await client.save();

    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
});

// Test view clients
router.get("/", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const clients = await Client.find({ users: userId }).populate("users");
    res.render("clients", { clients, user: req.user });
  } catch (error) {
    next(error);
  }
});

// Get all clients for user
// GET /api/users/:userId/clients
router.get("/", async (req, res, next) => {
  const userId = req.params.userId;
  const { email, firstName } = req.query;

  // TODO: Add query params for email and firstName

  try {
    // Find all clients where the users array contains the userId
    const clients = await Client.find({ users: userId }).populate("users");

    // Filter clients to ensure the userId is present in each client's users array
    const filteredClients = clients.filter((client) =>
      client.users.some((user) => user._id.toString() === userId)
    );

    // If no clients are associated with the userId, send a 403 Forbidden response
    if (filteredClients.length === 0) {
      return res
        .status(403)
        .json({ message: "No clients associated with this user" });
    }

    // Send the filtered list of clients as a response
    res.status(200).json(filteredClients);
  } catch (error) {
    // Handle any errors that occurred during the query
    next(error); // Forward error to the global error handler
  }
});

// Get a single client
// GET /api/users/:userId/clients/:clientId
router.get("/:clientId", async (req, res, next) => {
  const userId = req.params.userId;
  const clientId = req.params.clientId;

  try {
    const client = await Client.findById(clientId).populate("users");
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (!client.users.some((user) => user._id.toString() === userId)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
});

// Update a client
// PUT /api/users/:userId/clients/:clientId
router.put("/:clientId", async (req, res, next) => {
  const userId = req.params.userId;
  const clientId = req.params.clientId;
  const { firstName, email } = req.body;

  try {
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to update" });
    }

    const client = await Client.findById(clientId).populate("users");

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.firstName = firstName || client.firstName;
    client.email = email || client.email;

    await client.save();

    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
});

// Delete a client
// DELETE /api/users/:userId/clients/:clientId
router.delete("/:clientId", async (req, res, next) => {
  const userId = req.params.userId;
  const clientId = req.params.clientId;

  try {
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete" });
    }

    // Find the client and delete it
    const client = await Client.findByIdAndDelete(clientId).populate("users");

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res
      .status(200)
      .json({ message: "Client deleted successfully", deletedClient: client });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
