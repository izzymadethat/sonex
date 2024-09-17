const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "completed", "archived"],
      required: true,
      default: "active",
    },
    paymentStatus: {
      type: String,
      enum: [
        "unpaid",
        "no-charge",
        "paid",
        "partially-paid",
        "failed",
        "overpaid",
      ],
      required: true,
      default: "unpaid",
    },
    projectAmount: {
      type: Number,
      default: 0,
      required: true,
    },
    amountPaid: {
      type: Number,
      default: 0,
      required: true,
    },
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
