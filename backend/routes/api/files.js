// Files are only attached to projects
// Routes start with /api/projects/:projectId/uploads
const router = require("express").Router({ mergeParams: true });
const multer = require("multer");
const File = require("../../models/file");
const { uploadToS3 } = require("../../config/aws-s3.config");
const Project = require("../../models/project");

// File middleware
const storage = multer.memoryStorage();

// check if file is an audio file
const fileFilter = (_req, file, cb) => {
  if (file.mimetype.split("/")[0] === "audio") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("File must be an audio file"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

// Upload files and create a new file object for each file uploaded
router.post("/", upload.array("file"), async (req, res, next) => {
  // res.status(201).send("File uploaded");
  const { projectId } = req.params;
  const files = req.files;
  try {
    console.log("Files received: ", files);
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files were uploaded",
      });
    }
    console.log("Uploading to S3...");
    const s3Results = await uploadToS3(files, projectId);
    console.log("S3 upload results: ", s3Results);
    const fileResults = await Promise.all(
      files.map(async (file, index) => {
        let s3Result = s3Results[index];
        return await new File({
          name: file.originalname,
          size: file.size,
          type: file.mimetype.split("/")[1],
          projectId,
          path: s3Result.objectUrl,
        }).save();
      })
    );
    console.log("Files saved to database: ", fileResults);
    return res.status(201).json({
      message: "Files uploaded successfully",
      files: fileResults,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", (req, res, next) => {
  console.log(req.params, req.url);
  res.render("fileForm", { projectId: req.params.projectId });
});

module.exports = router;
