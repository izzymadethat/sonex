const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		text: {
			type: String,
			required: true,
			maxLength: 150,
		},
		email: String,
		clientId: String,
		userAgent: String,
		projectId: {
			type: Schema.Types.ObjectId,
			ref: "Project",
			required: true,
		},
		timestamp: {
			type: String || null,
		},
		type: {
			type: String,
			enum: ["revision", "feedback"],
			required: true,
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
