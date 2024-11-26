const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const handleValidationErrors = require("../../utils/validation");
const { User, File, Project, Comment } = require("../../db/models");
const { s3Client } = require("../../config/aws-s3.config");
const { awsS3 } = require("../../config");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { requireAuth } = require("../../utils/auth");

const validateSignup = [
	check("firstName")
		.exists({ checkFalsy: true })
		.withMessage("First name is required"),
	check("lastName")
		.exists({ checkFalsy: true })
		.withMessage("Last name is required"),
	check("username")
		.exists({ checkFalsy: true })
		.withMessage("Username is required")
		.isLength({ min: 6, max: 20 })
		.withMessage("Username must be between 6 and 20 characters long"),
	check("email").exists({ checkFalsy: true }).withMessage("Email is required"),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
	handleValidationErrors,
];

// Signup a user
// POST /api/users
router.post("/", validateSignup, async (req, res, next) => {
	const incomingUser = req.body;
	const hashedPassword = bcrypt.hashSync(incomingUser.password);
	incomingUser.hashedPassword = hashedPassword;
	try {
		const user = await User.create(incomingUser);

		const safeUser = {
			id: user.id,
			email: user.email,
			username: user.username,
		};

		await setTokenCookie(res, safeUser);

		return res.json({
			user: safeUser,
		});
	} catch (error) {
		next(error);
	}
});

// Update a user
// Update a user data
// PUT /api/users/:userId
router.put("/:userId", requireAuth, async (req, res, next) => {
	const userId = req.params.userId;
	const user = req.user;

	try {
		const existingUser = await User.findByPk(userId);
		if (!existingUser) {
			return res.status(404).json({ message: "User not found" });
		}

		if (existingUser.id !== user.id) {
			return res
				.status(403)
				.json({ message: "You do not have permissions to update this user" });
		}

		const updatedUser = await existingUser.update(req.body);
		return res.json({ user: updatedUser });
	} catch (error) {
		next(error);
	}
});

// Delete a user
// Must also delete projects, files, and comments
// DELETE /api/users/:userId
router.delete("/:userId", requireAuth, async (req, res, next) => {
	const userId = req.params.userId;
	const user = req.user.id;

	try {
		const existingUser = await User.findByPk(userId, {
			include: [
				{
					model: Project,
					as: "projects",
					include: [
						{ model: File, required: false, as: "files" },
						{ model: Comment, required: false, as: "comments" },
					],
				},
			],
		});

		if (!existingUser) {
			return res.status(404).json({ message: "User not found" });
		}

		if (existingUser.id !== user.id) {
			return res
				.status(403)
				.json({ message: "You do not have permission to delete this user" });
		}

		// delete all files from S3
		for (const project of existingUser.projects) {
			if (project.files.length === 0) continue;

			for (const file of project.files) {
				const s3Params = {
					Bucket: awsS3.bucketName,
					Key: file.path,
				};
				await s3Client.send(new DeleteObjectCommand(s3Params));
			}
		}

		// if (filesToDelete.length > 0) {
		// 	for (const file of filesToDelete) {
		// 		const s3Params = {
		// 			Bucket: awsS3.bucketName,
		// 			Key: file.path,
		// 		};
		// 		await s3Client.send(new DeleteObjectCommand(s3Params));
		// 	}

		// 	await File.deleteMany({ userId }, { session });
		// }

		// await Project.deleteMany({ userId }, { session });
		// await Comment.deleteMany({ userId }, { session });
		// await User.deleteOne({ _id: userId }, { session });
		// await session.commitTransaction();

		// Delete all projects associated with the user
		await Project.destroy({ where: { userId } });

		// Finally, delete the user
		await User.destroy({ where: { id: userId } });
		res.json({ message: "User deleted successfully" });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
