// All project CRUD operations require USER Auth not CLIENT auth
// Routes start with /api/projects
const router = require("express").Router();
const { check } = require("express-validator");
const { Project, File } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { awsS3 } = require("../../config");
const { s3Client } = require("../../config/aws-s3.config");
const {
	ListObjectsV2Command,
	DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const handleValidationErrors = require("../../utils/validation");

const commentRoutes = require("./comments");
const fileRoutes = require("./files");

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
	check("projectAmount")
		.optional()
		.isFloat({ min: 0 })
		.withMessage("Please enter a valid amount")
		.toFloat(),
	check("dueDate")
		.optional()
		.matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/)
		.withMessage("Due date must be in MM/DD/YYYY format"),
	handleValidationErrors,
];

// Get projects for user
// GET /api/projects
router.get("/", requireAuth, async (req, res, next) => {
	const user = req.user;

	try {
		const projects = await Project.findAll({
			where: {
				ownerId: user.id,
			},
			include: { model: File, as: "files" },
		});

		const projectResults = projects.map((project) => {
			const projectSize = project.files.reduce(
				(acc, file) => acc + file.size / 1024 / 1024,
				0,
			);
			return {
				...project.get(),
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
router.post("/", requireAuth, validateProjectInput, async (req, res, next) => {
	const user = req.user;
	const projectData = req.body;
	try {
		const newProject = await Project.create({
			title: projectData.title,
			description: projectData.description || null,
			ownerId: user.id,
			projectAmount: projectData.projectAmount || 0,
			paymentStatus: projectData.projectAmount ? "unpaid" : "no-charge",
			dueDate: projectData.dueDate ? new Date(projectData.dueDate) : null,
		});
		res.status(201).json(newProject);
	} catch (error) {
		next(error);
	}
});

// Get a single project
// GET /api/projects/:projectId
router.get("/:projectId", async (req, res, next) => {
	const projectId = req.params.projectId;
	const user = req.user;
	try {
		const project = await Project.findByPk(projectId, {
			include: { model: File, as: "files" },
		});

		if (!project) {
			return res.status(404).json({
				message: "Project not found",
			});
		}

		// check if project belongs to user
		if (project.ownerId !== user.id) {
			return res.status(403).json({
				message: "You do not have permission to view this project",
			});
		}

		// const files = await File.find({ projectId });
		const storageUsed = project.files.reduce(
			(acc, file) => acc + file.size / 1024 / 1024,
			0,
		);

		const projectResult = {
			...project.get(),
			storageUsed,
		};

		res.status(200).json({ project: projectResult });
	} catch (error) {
		next(error);
	}
});

// Update project details
// PUT /api/projects/:projectId
// user must be logged in
// project must be owned by user
router.put(
	"/:projectId",
	requireAuth,
	validateProjectInput,
	async (req, res, next) => {
		const user = req.user;
		const projectId = req.params.projectId;
		const projectData = req.body;

		try {
			// find project or throw error if error
			const existingProject = await Project.findByPk(projectId);
			if (!existingProject)
				return res.status(404).send({ message: "Project not found" });

			// throw error if user is not owner of project
			if (existingProject.ownerId.toString() !== user.id.toString()) {
				return res.status(403).send({
					message: "You do not have permission to update this project",
				});
			}

			// update project details only if changed
			existingProject.title = projectData.title || existingProject.title;
			existingProject.description =
				projectData.description || existingProject.description;
			existingProject.projectAmount =
				projectData.projectAmount >= 0 ?? existingProject.projectAmount;

			// set payment status based on project amount
			if (existingProject.paymentAmout === 0) {
				existingProject.paymentStatus = "no-charge";
			} else {
				existingProject.paymentStatus = paymentStatus || "unpaid";
			}

			const updatedProject = await existingProject.save();
			res.json(updatedProject);
		} catch (error) {
			next(error);
		}
	},
);

// Delete a project
// DELETE /api/projects/:projectId
// user must be logged in
// project must be owned by user
router.delete("/:projectId", requireAuth, async (req, res, next) => {
	const projectId = req.params.projectId;
	const user = req.user;
	const projectFolderKey = `projects/${projectId}`;
	try {
		const existingProject = await Project.findByPk(projectId);

		if (!existingProject) {
			return res.status(404).json({
				message: "Project not found",
			});
		}

		// check if project belongs to user
		if (existingProject.ownerId.toString() !== user.id) {
			return res.status(403).json({
				message: "You do not have permission to delete this project",
			});
		}

		// Delete all project files from AWS
		const listedProjects = await s3Client.send(
			new ListObjectsV2Command({
				Bucket: awsS3.bucketName,
				Prefix: projectFolderKey,
			}),
		);

		if (listedProjects.Contents && listedProjects.Contents.length > 0) {
			await s3Client.send(
				new DeleteObjectsCommand({
					Bucket: awsS3.bucketName,
					Delete: {
						Objects: listedProjects.Contents.map((item) => ({ Key: item.Key })),
					},
				}),
			);
		}

		const deletedProject = await Project.destroy({
			where: { id: projectId },
		});

		res.status(200).json({
			message: "Successfully deleted project",
			Project: existingProject,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
