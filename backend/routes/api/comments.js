const router = require("express").Router({ mergeParams: true });
const Comment = require("../../models/comment");
const Project = require("../../models/project");
const handleValidationErrors = require("../../utils/validation");
const { check } = require("express-validator");
const { ObjectId } = require("mongoose").Types;
// These routes will handle a client and their comments
// Routes either start with /api/comments or /api/projects/:projectId/comments

const validateCommentInput = [
	check("text")
		.exists({ checkFalsy: true })
		.withMessage("Please enter a comment"),
	// .isLength({ gt: 6, lte: 250 })
	// .withMessage("Comment must be between 6 and 250 characters"),
	check("type")
		.optional()
		.isIn(["revision", "feedback"])
		.withMessage("Comment type must be 'revision' or 'feedback'"),
	check("timestamp")
		.optional()
		.matches(/^(\d{2}:)?\d{2}:\d{2}$/)
		.withMessage(
			"Please enter a valid timestamp in the format MM:SS or HH:MM:SS",
		),

	handleValidationErrors,
];

// Client creates a comment
router.post("/", validateCommentInput, async (req, res, next) => {
	const { projectId } = req.params;
	const { text, type, timestamp, email } = req.body;
	// const clientId = (req.client && req.client.id) || req.user.id; // req.user is temporary;
	const clientId = email; // for testing purposes

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
			timestamp: timestamp ?? null,
			projectId,
			email,
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
router.get("/", async (req, res, next) => {
	const userId = new ObjectId(req.session.user.id);

	try {
		// Find all projects that the user owns
		const projects = await Project.find({ userId: userId }).select("_id");

		// Extract project IDs
		const projectIds = projects.map((project) => project._id);

		// Fetch comments for these projects and populate client details
		const comments = await Comment.find(
			{
				projectId: { $in: projectIds },
			},
			"-clientId -__v",
		);

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
	const userId = req.session.user.id;

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
	const { text, type, timestamp, email, isCompleted } = req.body;
	// const clientId = (req.client && req.client.id) || req.user.id;
	const clientId = req.body.email; // for testing purposes
	try {
		const comment = await Comment.findById(commentId);

		if (!comment) {
			return res.status(404).json({ message: "Comment not found" });
		}

		// if (comment.clientId.toString() !== clientId) {
		//   return res.status(403).json({
		//     message: "You do not have permission to update this comment",
		//   });
		// }

		comment.text = text || comment.text;
		comment.type = type || comment.type;
		comment.timestamp = timestamp || comment.timestamp;
		comment.isCompleted =
			isCompleted !== undefined ? isCompleted : comment.isCompleted;

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
	// const clientId = (req.client && req.client.id) || req.user.id;

	try {
		const comment = await Comment.findById(commentId);
		if (!comment) {
			return res.status(404).json({ message: "Comment not found" });
		}

		// if (comment.clientId.toString() !== clientId) {
		//   return res.status(403).json({
		//     message: "You do not have permission to delete this comment",
		//   });
		// }

		await Comment.findByIdAndDelete(commentId);

		res.status(200).json({ message: "Comment deleted", comment });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
