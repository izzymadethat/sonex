const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  firstName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
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

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
