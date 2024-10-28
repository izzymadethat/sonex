const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      required: true
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    path: {
      type: String,
      required: true,
      unique: true
    }, // s3 path
    size: {
      type: Number,
      required: true
    },
    isDownloadable: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// fileSchema.pre("save", function (next) {
//   if (!this.uploaderUserId && !this.uploaderClientId) {
//     next(new Error("File must have either a user or client as the uploader."));
//   } else if (this.uploaderUserId && this.uploaderClientId) {
//     next(new Error("File cannot have both a user and client as the uploader."));
//   } else {
//     next();
//   }
// });

const File = mongoose.model("File", fileSchema);
module.exports = File;
