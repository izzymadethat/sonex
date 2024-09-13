const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userClientSchema = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserClient = mongoose.model("UserClient", userClientSchema);

module.exports = UserClient;
