// All project CRUD operations require USER Auth not CLIENT auth
// Routes start with /api/projects
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const Client = require("../../models/client");
const Project = require("../../models/project");
const Comment = require("../../models/comment");
const handleValidationErrors = require("../../utils/validation");
const commentRoutes = require("./comments");
const fileRoutes = require("./files");
const File = require("../../models/file");
const { s3Client } = require("../../config/aws-s3.config");
const { ListObjectsV2Command, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
const { awsS3 } = require("../../config");
const { ObjectId } = require("mongoose").Types;

// Comment routes
router.use("/:projectId/comments", commentRoutes);
// File routes
router.use("/:projectId/uploads", fileRoutes);

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
	check("projectAmount").optional().isFloat({ min: 0 }).withMessage("Please enter a valid amount"),
	handleValidationErrors,
];
const validateProjectQuery = [
	check("status")
		.optional()
		.isIn(["active", "completed", "archived"])
		.withMessage("Status must be 'active', 'completed', or 'complete'"),
	check("paymentStatus")
		.optional()
		.isIn(["unpaid", "no-charge", "paid", "partially-paid", "overpaid"])
		.withMessage("Payment status must be 'unpaid', 'no-charge', 'paid', 'partially-paid', or 'overpaid'"),
	check("projectAmount").optional().isFloat({ min: 0 }).withMessage("Please enter a valid amount"),
	check("title").optional().isLength({ max: 50 }).withMessage("Title must be less than 50 characters"),
	check("description")
		.optional()
		.isLength({ min: 3, max: 250 })
		.withMessage("Description must be between 3 and 250 characters"),
	check("amountPaid").optional().isFloat({ min: 0 }).withMessage("Please enter a valid amount"),
	check("paymentStatus")
		.optional()
		.isIn(["unpaid", "no-charge", "paid", "partially-paid", "overpaid"])
		.withMessage("Payment status must be 'unpaid', 'no-charge', 'paid', 'partially-paid', or 'overpaid'"),
	handleValidationErrors,
];
// Get projects for user
// GET /api/projects
router.get("/", validateProjectQuery, async (req, res, next) => {
	try {
		const userId = new ObjectId(req.session.user.id);
		const projects = await Project.find({ userId }, "-clients -comments -__v").populate("files");
		const projectResults = projects.map((project) => {
			const projectSize = project.files.reduce((acc, file) => acc + file.size / 1024 / 1024, 0);
			return {
				...project._doc,
				storageUsed: projectSize,
			};
		});

		res.json({ Projects: projectResults, User: req.user });
	} catch (error) {
		next(error);
	}
});

// Create a project
// POST /api/projects
// user must be logged in
router.post("/", validateProjectInput, async (req, res, next) => {
	try {
		const userId = req.session.user.id;

		const { title, description, projectAmount } = req.body;
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
});

// Get a single project
// GET /api/projects/:projectId
// user must be logged in
router.get("/:projectId", async (req, res, next) => {
	const projectId = req.params.projectId;
	const userId = req.session.user.id;
	try {
		const project = await Project.findById(projectId, "-clients -comments -__v");

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

		const files = await File.find({ projectId });
		const storageUsed = files.reduce((acc, file) => acc + file.size / 1024 / 1024, 0);

		const projectResult = {
			...project._doc,
			storageUsed,
		};

		res.status(200).json({ project: projectResult });
	} catch (error) {
		next(error);
	}
});

// Get all clients from a project
// GET /api/projects/:projectId/clients
router.get(
	"/:projectId/clients",

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

// Helper function to determine payment status
const determinePaymentStatus = (projectAmount, amountPaid, manualStatus = null) => {
	if (manualStatus) return manualStatus;
	if (projectAmount === 0) return "no-charge";
	if (amountPaid > projectAmount) return "overpaid";
	if (amountPaid === projectAmount) return "paid";
	if (amountPaid > 0) return "partially-paid";
	return "unpaid";
};

// Update project details
// PUT /api/projects/:projectId
// user must be logged in
// project must be owned by user
router.put("/:projectId", validateProjectInput, async (req, res, next) => {
	try {
		const existingProject = await Project.findById(req.params.projectId);
		if (!existingProject || existingProject.userId.toString() !== req.session.user.id.toString()) {
			return res.status(!existingProject ? 404 : 403).json({
				message: !existingProject ? "Project not found" : "You do not have permission to update this project",
			});
		}

		const { title, description, status, projectAmount, amountPaid, paymentStatus } = req.body;

		// Update basic fields
		Object.assign(existingProject, {
			title: title || existingProject.title,
			description: description || existingProject.description,
			status: status || existingProject.status,
			projectAmount: projectAmount === 0 || projectAmount ? projectAmount : existingProject.projectAmount,
			amountPaid: amountPaid > 0 ? Number(amountPaid) : existingProject.amountPaid,
		});

		// Update payment status
		existingProject.paymentStatus = determinePaymentStatus(
			existingProject.projectAmount,
			existingProject.amountPaid,
			paymentStatus
		);

		const updatedProject = await existingProject.save();
		res.status(200).json({
			...updatedProject._doc,
			messages:
				existingProject.amountPaid > existingProject.projectAmount
					? { "Overpayment warning": "Total amount paid is greater than project amount." }
					: {},
		});
	} catch (error) {
		next(error);
	}
});

// Add a client to a project
// PUT /api/projects/:projectId/clients
// project must be owned by user
// client must already exist for user
router.put(
	"/:projectId/clients",

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
router.delete("/:projectId", async (req, res, next) => {
	const projectId = req.params.projectId;
	const userId = req.session.user.id.toString();
	const projectFolderKey = `projects/${projectId}`;
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

		// const deletedProject = await Project.findByIdAndDelete(projectId);
		// Delete all comments and files associated with the project
		const listedProjects = await s3Client.send(
			new ListObjectsV2Command({
				Bucket: awsS3.bucketName,
				Prefix: projectFolderKey,
			})
		);

		if (listedProjects.Contents && listedProjects.Contents.length > 0) {
			await s3Client.send(
				new DeleteObjectsCommand({
					Bucket: awsS3.bucketName,
					Delete: {
						Objects: listedProjects.Contents.map((item) => ({ Key: item.Key })),
					},
				})
			);
		}
		await File.deleteMany({ projectId });
		await Comment.deleteMany({ projectId });
		const deletedProject = await Project.findByIdAndDelete(projectId);

		res.status(200).json({
			message: "Successfully deleted project",
			Project: deletedProject,
		});
	} catch (error) {
		next(error);
	}
});

// Public route to get project details
router.get("/:projectId/public", async (req, res) => {
	try {
		const project = await Project.findById(req.params.projectId)
			.select("title description paymentStatus projectAmount")
			.lean();

		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		res.json({ project });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
