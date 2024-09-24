// All project CRUD operations require USER Auth not CLIENT auth
// Routes start with /api/projects
const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const Client = require("../../models/client");
const Project = require("../../models/project");
const { authenticatedUsersOnly } = require("../../utils/auth");
const handleValidationErrors = require("../../utils/validation");
const commentRoutes = require("./comments");

// Comment routes
router.use("/:projectId/comments", commentRoutes);

// Validation middleware
const validateProjectInput = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please enter a title")
    .isLength({ max: 50 })
    .withMessage("Title must be less than 50 characters"),
  check("description")
    .optional()
    .isLength({ min: 3, max: 250 })
    .withMessage("Description must be between 3 and 250 characters"),
  check("projectAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Please enter a valid amount"),
  handleValidationErrors,
];

// Get projects for user
// GET /api/projects
router.get("/", authenticatedUsersOnly, async (req, res, next) => {
  const userId = req.user.id;
  const projects = await Project.find({ userId }).populate("clients");
  res.json({ Projects: projects, User: req.user });
});

// Create a project
// POST /api/projects
// user must be logged in
router.post(
  "/",
  authenticatedUsersOnly,
  validateProjectInput,
  async (req, res, next) => {
    const userId = req.user.id;
    const { title, description, projectAmount } = req.body;

    // if (!title) {
    //   return res.status(400).json({
    //     errorMessage: "Please enter a title",
    //   });
    // }

    try {
      const newProject = await new Project({
        title,
        description: description || null,
        userId,
        projectAmount: projectAmount || 0,
        paymentStatus: projectAmount ? "unpaid" : "no-charge",
      }).save();

      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
);

// Get a single project
// GET /api/projects/:projectId
// user must be logged in
router.get("/:projectId", authenticatedUsersOnly, async (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.user.id.toString();

  try {
    const project = await Project.findById(projectId).populate("clients");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // check if project belongs to user
    if (project.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to view this project",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

// Get all clients from a project
// GET /api/projects/:projectId/clients
router.get(
  "/:projectId/clients",
  authenticatedUsersOnly,
  async (req, res, next) => {
    const projectId = req.params.projectId;
    const userId = req.user.id.toString();

    try {
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }
      if (project.userId.toString() !== userId) {
        return res.status(403).json({
          message: "You do not have permission to view this project",
        });
      }
      const clients = await Client.find({ projectId });
      res.status(200).json({ Clients: clients });
    } catch (error) {
      next(error);
    }
  }
);

// Update project details
// PUT /api/projects/:projectId
// user must be logged in
// project must be owned by user
router.put(
  "/:projectId",
  authenticatedUsersOnly,
  validateProjectInput,
  async (req, res, next) => {
    const projectId = req.params.projectId;
    const userId = req.user.id.toString();

    const {
      title,
      description,
      status,
      projectAmount,
      amountPaid,
      paymentStatus,
    } = req.body;

    try {
      const existingProject = await Project.findById(projectId);

      if (!existingProject) {
        return res.status(404).json({
          message: "Project not found ",
        });
      }

      // check if project belongs to user
      if (existingProject.userId.toString() !== userId) {
        return res.status(403).json({
          message: "You do not have permission to update this project",
        });
      }

      existingProject.title = title || existingProject.title;
      existingProject.description = description || existingProject.description;
      existingProject.status = status || existingProject.status;
      existingProject.projectAmount =
        projectAmount === 0 || projectAmount
          ? projectAmount
          : existingProject.projectAmount;

      let messages = {};

      if (!amountPaid) {
        existingProject.amountPaid = existingProject.amountPaid || 0;
      }
      // update payment status
      // if the project amount was changed to 0, set the payment status to no-charge
      if (projectAmount === 0) {
        // If project amount is 0, mark as 'no-charge'
        existingProject.paymentStatus = "no-charge";
      } else {
        // Handle other payment statuses if projectAmount > 0
        existingProject.projectAmount = projectAmount;

        // Reassess the payment status based on the current amountPaid
        if (existingProject.amountPaid > existingProject.projectAmount) {
          existingProject.paymentStatus = "overpaid";
        } else if (
          existingProject.amountPaid === existingProject.projectAmount
        ) {
          existingProject.paymentStatus = "paid";
        } else if (existingProject.amountPaid > 0) {
          existingProject.paymentStatus = "partially-paid";
        } else {
          existingProject.paymentStatus = "unpaid"; // Handles cases where amountPaid is 0 or undefined
        }
      }

      // If a new amountPaid is provided in the request, process it
      if (amountPaid && amountPaid > 0) {
        existingProject.amountPaid = Number(amountPaid);

        // Re-evaluate the payment status based on the new amountPaid
        if (existingProject.amountPaid > existingProject.projectAmount) {
          existingProject.paymentStatus = "overpaid";
        } else if (
          existingProject.amountPaid === existingProject.projectAmount
        ) {
          existingProject.paymentStatus = "paid";
        } else {
          existingProject.paymentStatus = "partially-paid";
        }
      }

      if (existingProject.amountPaid > existingProject.projectAmount) {
        messages["Overpayment amount warning"] =
          "Total amount paid is greater than project amount";
      }

      const updatedProject = await existingProject.save();

      const results = {
        ...updatedProject._doc,
        messages,
      };

      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  }
);

// Add a client to a project
// PUT /api/projects/:projectId/clients
// project must be owned by user
// client must already exist for user
router.put(
  "/:projectId/clients",
  authenticatedUsersOnly,
  async (req, res, next) => {
    const projectId = req.params.projectId;
    const userId = req.user.id.toString();
    const { clientId } = req.query;

    try {
      const existingProject = await Project.findById(projectId);
      if (!existingProject) {
        return res.status(404).json({
          message: "Project not found",
        });
      }
      if (existingProject.userId.toString() !== userId) {
        return res.status(403).json({
          message: "You do not have permission to add clients to this project",
        });
      }
      const existingClient = await Client.findById(clientId);
      if (!existingClient) {
        return res.status(404).json({
          message: "Client not found",
        });
      }

      // Check if the user is in the client's users array
      if (!existingClient.users.includes(userId)) {
        return res.status(403).json({
          message: "This client is not associated with your account",
        });
      }

      existingProject.clients.push(clientId);
      await existingProject.save();
      res.status(200).json(existingProject);
    } catch (error) {
      next(error);
    }
  }
);

// Delete a project
// DELETE /api/projects/:projectId
// user must be logged in
// project must be owned by user
router.delete("/:projectId", authenticatedUsersOnly, async (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.user.id.toString();

  try {
    const existingProject = await Project.findById(projectId);

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // check if project belongs to user
    if (existingProject.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to delete this project",
      });
    }

    const deletedProject = await Project.findByIdAndDelete(projectId);

    res.status(200).json({
      message: "Successfully deleted project",
      Project: deletedProject,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
