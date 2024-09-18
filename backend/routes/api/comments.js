const router = require("express").Router({ mergeParams: true });
const Client = require("../../models/client");
const Comment = require("../../models/comment");
const { requireAuth } = require("../../utils/auth");

// These routes will handle a client and their comments
// Routes start with /api/projects/:projectId/comments

// TODO: Write middleware to make sure client exists and is authorized to view project

// Client creates a comment
router.post("/", async (req, res, next) => {
  const { projectId } = req.params;
  const clientId = req.client._id; // TODO: Set this up
  const { text } = req.body;

  try {
    const comment = await new Comment({
      text,
      projectId,
      clientId,
    }).save();

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

// Get all comments from a project
// Only the project owner can see all comments
router.get("/", requireAuth, async (req, res, next) => {
  const { projectId } = req.params;
  try {
    // Show comments and the clients that made them
    const comments = await Comment.find({ projectId }).populate("clientId");
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

// Update a comment
// Only the client that created the comment can update it
router.put("/:commentId", async (req, res, next) => {
  const { commentId } = req.params;
  const { text } = req.body;
  const clientId = req.client._id;

  try {
    const comment = await Comment.findById(commentId).populate("clientId");
    if (comment.clientId.toString() !== clientId) {
      return res.status(403).json({
        message: "You do not have permission to update this comment",
      });
    }

    comment.text = text || comment.text;

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
  const clientId = req.client._id; // TODO: Set this up

  try {
    const comment = await Comment.findById(commentId).populate("clientId");
    if (comment.clientId.toString() !== clientId) {
      return res.status(403).json({
        message: "You do not have permission to delete this comment",
      });
    }

    await comment.remove();

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
