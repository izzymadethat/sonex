const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const mongoose = require("mongoose");
const handleValidationErrors = require("../../utils/validation");
const User = require("../../models/user");
const Client = require("../../models/client");
const File = require("../../models/file");
const { s3Client } = require("../../config/aws-s3.config");
const { awsS3 } = require("../../config");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const Project = require("../../models/project");
const Comment = require("../../models/comment");
const bcrypt = require("bcryptjs");

const validateSignup = [
	check("firstName").exists({ checkFalsy: true }).withMessage("First name is required"),
	check("lastName").exists({ checkFalsy: true }).withMessage("Last name is required"),
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
router.post(
	'/',
	validateSignup,
	async (req, res) => {
	  const incomingUser = req.body;
	  const hashedPassword = bcrypt.hashSync(incomingUser.password);
	  const user = await User.create(incomingUser);
  
	  const safeUser = {
		id: user.id,
		email: user.email,
		username: user.username,
	  };
  
	  await setTokenCookie(res, safeUser);
  
	  return res.json({
		user: safeUser
	  });
	}
  );

// Update a user
// Update a user data
// PUT /api/users/:userId
router.put("/:userId", async (req, res, next) => {
	const { userId } = req.params; // will be used to compare with req.session.user.id
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.session.user.id,
			req.body,
			{ new: true },
		);
		return res.json({ user: updatedUser });
	} catch (error) {
		next(error);
	}
});

// Delete a user
// Must also delete projects, clients, files, and comments
// DELETE /api/users/:userId
router.delete("/:userId", async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const userId = req.session.user.id || req.params.userId;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		} else if (req.session.user.id !== userId) {
			return res
				.status(403)
				.json({ message: "You do not have permission to delete this user" });
		}

		// await Client.deleteMany({ users: userId }, { session });
		const filesToDelete = await File.find({ userId });

		if (filesToDelete.length > 0) {
			for (const file of filesToDelete) {
				const s3Params = {
					Bucket: awsS3.bucketName,
					Key: file.path,
				};
				await s3Client.send(new DeleteObjectCommand(s3Params));
			}

			await File.deleteMany({ userId }, { session });
		}

		await Project.deleteMany({ userId }, { session });
		await Comment.deleteMany({ userId }, { session });
		await User.deleteOne({ _id: userId }, { session });
		await session.commitTransaction();
		res.json({ message: "User deleted successfully" });
	} catch (error) {
		await session.abortTransaction();
		next(error);
	} finally {
		session.endSession();
	}
});

module.exports = router;
