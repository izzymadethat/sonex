const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userClientProjectSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

const UserClientProject = mongoose.model("UserClient", userClientProjectSchema);

module.exports = UserClientProject;
