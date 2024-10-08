const router = require("express").Router({ mergeParams: true });
const Client = require("../../models/client");
const Comment = require("../../models/comment");
const Project = require("../../models/project");
const { requireAuth, authenticatedUsersOnly } = require("../../utils/auth");
const handleValidationErrors = require("../../utils/validation");
const { check } = require("express-validator");

// These routes will handle a client and their comments
// Routes either start with /api/comments or /api/projects/:projectId/comments

const validateCommentInput = [
  check("text")
    .exists({ checkFalsy: true })
    .withMessage("Please enter a comment")
    .isLength({ min: 1, max: 250 })
    .withMessage("Comment must be between 1 and 250 characters"),
  check("type")
    .exists({ checkFalsy: true })
    .withMessage("Please enter a comment type")
    .isIn(["revision", "general feedback"])
    .withMessage("Comment type must be 'revision' or 'general feedback'"),
  check("timestamp")
    .optional()
    .matches(/^(\d{2}:)?\d{2}:\d{2}$/)
    .withMessage(
      "Please enter a valid timestamp in the format MM:SS or HH:MM:SS"
    ),

  handleValidationErrors,
];

// Client creates a comment
router.post("/", validateCommentInput, async (req, res, next) => {
  const { projectId } = req.params;
  const clientId = (req.client && req.client.id) || req.user.id; // req.user is temporary;
  const { text, type, timestamp } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const comment = await new Comment({
      text,
      type,
      timestamp,
      projectId,
      clientId,
    }).save();

    project.comments.push(comment._id); // TODO: also add comment to client
    await project.save();

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

// Get all comments
// Only the project owner can see all comments
// Route is /api/comments not /api/projects/:projectId/comments
router.get("/current", authenticatedUsersOnly, async (req, res, next) => {
  const userId = req.user.id.toString();

  try {
    // Find all projects that the user owns
    const projects = await Project.find({ userId: userId }).select("_id");

    // Extract project IDs
    const projectIds = projects.map((project) => project._id);

    // Fetch comments for these projects and populate client details
    const comments = await Comment.find({
      projectId: { $in: projectIds },
    }).populate("clientId");

    res.json({ Comments: comments });
  } catch (error) {
    next(error);
  }
});

// Get all comments from a project
// Only the project owner can see all comments
// Route is /api/projects/:projectId/comments
router.get("/", async (req, res, next) => {
  const { projectId } = req.params;
  const userId = req.user.id.toString();

  try {
    // Check if the project exists and if the user is the owner
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Verify the project is owned by the current user
    if (project.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to view comments for this project",
      });
    }

    // Fetch and return comments if the user is the owner
    const comments = await Comment.find({ projectId }).populate("clientId");
    res.json({ Comments: comments, projectId });
  } catch (error) {
    next(error);
  }
});

// Update a comment
// Only the client that created the comment can update it
router.put("/:commentId", validateCommentInput, async (req, res, next) => {
  const { commentId } = req.params;
  const { text, type, timestamp } = req.body;
  const clientId = (req.client && req.client.id) || req.user.id;

  try {
    const comment = await Comment.findById(commentId).populate("clientId");

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.clientId.toString() !== clientId) {
      return res.status(403).json({
        message: "You do not have permission to update this comment",
      });
    }

    comment.text = text || comment.text;
    comment.type = type || comment.type;
    comment.timestamp = timestamp || comment.timestamp;

    await comment.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (error) {
    next(error);
  }
});

// Delete a comment
// Only the client that created the comment can delete it
router.delete("/:commentId", async (req, res, next) => {
  const { commentId } = req.params;
  const clientId = (req.client && req.client.id) || req.user.id;

  try {
    const comment = await Comment.findById(commentId).populate("clientId");
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.clientId.toString() !== clientId) {
      return res.status(403).json({
        message: "You do not have permission to delete this comment",
      });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
