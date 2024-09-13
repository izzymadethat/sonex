const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed", "archived"],
    required: true,
    default: "active",
  },
  paymentStatus: {
    type: String,
    enum: ["unpaid", "no-charge", "paid", "partially-paid", "failed"],
    required: true,
    default: "free",
  },
  totalAmount: {
    type: Number,
    default: 0,
    required: true,
  },
  amountPaid: {
    type: Number,
    default: 0,
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

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
