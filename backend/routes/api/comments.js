// These routes will handle a client and their comments
// Routes either start with /api/comments or /api/projects/:projectId/comments

const router = require("express").Router({ mergeParams: true });
const { Project, Comment } = require("../../db/models");
const { check } = require("express-validator");
const handleValidationErrors = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Op, where } = require("sequelize");

const validateCommentInput = [
	check("text")
		.exists({ checkFalsy: true })
		.withMessage("Please enter a comment"),
	check("email").exists({ checkFalsy: true }).withMessage("Please enter email"),
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

// Client (or User) create a comment
// POST /api/projects/:projectId/comments
router.post("/", validateCommentInput, async (req, res, next) => {
	const projectId = req.params.projectId;
	const user = req.user;

	const { text, type, timestamp, email } = req.body;
	try {
		const project = await Project.findByPk(projectId, {
			include: { model: Comment, as: "comments" },
		});

		if (!project) {
			return res.status(404).json({
				message: "Project not found",
			});
		}

		const comment = await Comment.create({
			text,
			type: type ?? "revision",
			timestamp: timestamp ?? null,
			projectId,
			userId: user ? user.id : null,
			email,
		});

		res.status(201).json(comment);
	} catch (error) {
		next(error);
	}
});

// Get all comments
// Only the project owner can see all comments
// Route is /api/comments not /api/projects/:projectId/comments
router.get("/", requireAuth, async (req, res, next) => {
	const user = req.user;
	try {
		// // Find all projects that the user owns
		// const projects = await Project.findAll({
		// 	where: { ownerId: user.id },
		// });

		// // Extract project IDs
		// const projectIds = projects.map((project) => project.id);

		// Fetch comments for these projects and populate client details
		// const comments = await Comment.findAll({
		// 	where: {
		// 		projectId: {
		// 			[Op.in]: projectIds,
		// 		},
		// 	},
		// });

		const comments = Comment.findAll({
			include: {
				model: Project,
				where: { ownerId: user.id },
				attributes: [],
			},
		});

		res.json({ Comments: comments });
	} catch (error) {
		next(error);
	}
});

// Get all comments from a project
// Only the project owner can see all comments
// Route is /api/projects/:projectId/comments
router.get("/:projectId", requireAuth, async (req, res, next) => {
	const projectId = req.params.projectId;
	const user = req.user.id;

	try {
		// Check if the project exists and if the user is the owner
		// const project = await Project.findByPk(projectId);

		// if (!project) {
		// 	return res.status(404).json({ message: "Project not found" });
		// }

		// // Verify the project is owned by the current user
		// if (project.userId.toString() !== userId) {
		// 	return res.status(403).json({
		// 		message: "You do not have permission to view comments for this project",
		// 	});
		// }

		// // Fetch and return comments if the user is the owner
		// const comments = await Comment.find({ where: { projectId } });

		const project = await Project.findOne({
			where: { id: projectId, ownerId: user.id },
			include: {
				model: Comment,
				as: "comments",
			},
		});

		if (!project) {
			return res.status(400).json({ message: "Project not found" });
		}

		const comments = project.comments;

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
	const commentId = req.params.commentId;
	const user = req.user;
	const email = req.body.email;

	try {
		const comment = await Comment.findByPk(commentId);

		if (!comment) {
			return res.status(404).json({ message: "Comment not found" });
		}

		if (comment.userId !== user?.id || comment.email !== email) {
			return res.status(403).json({
				message: "You do not have permission to delete this comment",
			});
		}

		await Comment.destroy({
			where: {
				id: commentId,
			},
		});

		res.status(200).json({ message: "Comment deleted", comment });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
