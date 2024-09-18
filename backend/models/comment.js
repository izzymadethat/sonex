const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxLength: 150,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  timestamp: {
    type: String,
  },
  type: {
    type: String,
    enum: ["revision", "general feedback"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
