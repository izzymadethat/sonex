const router = require("express").Router({ mergeParams: true });
const Comment = require("../../models/comment");
const Project = require("../../models/project");
const handleValidationErrors = require("../../utils/validation");
const { check } = require("express-validator");
const { ObjectId } = require("mongoose").Types;
// These routes will handle a client and their comments
// Routes either start with /api/comments or /api/projects/:projectId/comments

const validateCommentInput = [
	check("text").exists({ checkFalsy: true }).withMessage("Please enter a comment"),

	check("type").optional().isIn(["revision", "feedback"]).withMessage("Comment type must be 'revision' or 'feedback'"),

	check("timestamp")
		.optional({ nullable: true, checkFalsy: true }) // Allow null and empty values
		.custom((value) => {
			if (!value) return true; // Skip validation if no timestamp
			return /^(\d{2}:)?\d{2}:\d{2}$/.test(value);
		})
		.withMessage("Please enter a valid timestamp in the format MM:SS or HH:MM:SS"),

	handleValidationErrors,
];

// Client creates a comment
router.post("/", validateCommentInput, async (req, res, next) => {
	const { projectId } = req.params;
	const { text, type, timestamp, email, clientId, userAgent } = req.body;

	try {
		const project = await Project.findById(projectId);

		if (!project) {
			return res.status(404).json({
				message: "Project not found",
			});
		}

		const comment = await new Comment({
			text,
			type: type ?? "revision",
			timestamp: timestamp || null, // Ensure null if timestamp is falsy
			projectId,
			email,
			clientId,
			userAgent,
		}).save();

		project.comments.push(comment._id);
		await project.save();

		res.status(201).json(comment);
	} catch (error) {
		next(error);
	}
});

// Get all comments for a user
router.get("/all", async (req, res, next) => {
	const userId = new ObjectId(req.session.user.id);
	try {
		const projects = await Project.find({ userId: userId }).select("_id");
		const projectIds = projects.map((project) => project._id);
		const comments = await Comment.find({ projectId: { $in: projectIds } }, "-clientId -__v");
		res.json({ Comments: comments });
	} catch (error) {
		next(error);
	}
});

// Get comments for a specific project
router.get("/project/:projectId", async (req, res, next) => {
	const { projectId } = req.params;
	try {
		const comments = await Comment.find({ projectId });
		res.json({ Comments: comments });
	} catch (error) {
		next(error);
	}
});

// Update a comment
// Only the client that created the comment can update it
router.put("/:commentId", async (req, res, next) => {
	const { commentId } = req.params;
	const { text, type, timestamp, isCompleted } = req.body;
	try {
		const comment = await Comment.findById(commentId);

		if (!comment) {
			return res.status(404).json({ message: "Comment not found" });
		}

		comment.text = text || comment.text;
		comment.type = type || comment.type;
		comment.timestamp = timestamp || comment.timestamp;
		comment.isCompleted = isCompleted !== undefined ? isCompleted : comment.isCompleted;

		await comment.save();

		res.status(200).json({ message: "Comment updated", comment });
	} catch (error) {
		next(error);
	}
});

// Delete a comment
// Only the client that created the comment can delete it
router.delete("/:commentId", async (req, res) => {
	try {
		const { projectId, commentId } = req.params;

		// Remove comment from the project's comments array
		await Project.findByIdAndUpdate(projectId, { $pull: { comments: commentId } });

		// Delete the comment
		const deletedComment = await Comment.findByIdAndDelete(commentId);

		if (!deletedComment) {
			return res.status(404).json({ message: "Comment not found" });
		}

		res.json({ message: "Comment deleted successfully" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
