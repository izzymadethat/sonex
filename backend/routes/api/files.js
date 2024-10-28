// Files are only attached to projects
// Routes start with /api/projects/:projectId/uploads
const router = require("express").Router({ mergeParams: true });
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
const multer = require("multer");
const multerS3 = require("multer-s3");
const File = require("../../models/file");
const Project = require("../../models/project");
const { awsS3, cloudFront } = require("../../config");
const { s3Client } = require("../../config/aws-s3.config");

// config for multer-s3 storage. allows for storage str8 to aws
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: awsS3.bucketName,
    key: (req, file, cb) => {
      const { projectId } = req.params;
      cb(null, `projects/${projectId}/${file.originalname}`);
    },
    contentType: (_req, file, cb) => {
      cb(null, file.mimetype);
    }
  }),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.split("/")[0] === "audio") {
      cb(null, true);
    } else {
      cb(new multer.MulterError("File must be an audio file"), false);
    }
  }
});

// Upload files and create a new file object for each file uploaded
router.post("/", upload.array("tracks"), async (req, res, next) => {
  const { projectId } = req.params;
  const files = req.files;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files were uploaded"
      });
    }

    const fileResults = await Promise.all(
      files.map(async (file) => {
        const s3Key = file.key;

        const savedFile = await new File({
          name: file.originalname,
          size: file.size,
          type: file.mimetype.split("/")[1],
          path: s3Key,
          projectId,
          userId: req.session.user.id
        }).save();

        return savedFile;
      })
    );
    return res.status(201).json({ Files: fileResults });
  } catch (error) {
    next(error);
  }
});

// Get all files for a project
router.get("/", async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const files = await File.find({ projectId }, "-__v -updatedAt").exec();
    res.send(files);
  } catch (error) {
    next(error);
  }
});

const distName = "https://d1v3tj0sy1kmbm.cloudfront.net";
// Get a Single File
router.get("/:fileName", async (req, res, next) => {
  const { projectId, fileName } = req.params;
  try {
    const file = await File.findOne({ name: fileName }, "-__v");

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const fileResponse = file.toObject();
    // fileResponse.url = `${distName}/uploads/${projectId}/${fileName}`;
    fileResponse.streamUrl = getSignedUrl({
      url: `${distName}/projects/${projectId}/${fileName}`,
      dateLessThan: new Date(Date.now() + 1000 * 60 * 60 * 24), // expires in 1 day
      privateKey: cloudFront.privateKey,
      keyPairId: cloudFront.keyPairId
    });

    res.send(fileResponse);
  } catch (error) {
    next(error);
  }
});

router.delete("/:fileName", async (req, res, next) => {
  // files are deleted from S3 and database
  const { projectId, fileName } = req.params;
  try {
    const file = await File.findOne({ name: fileName, projectId });
    if (!file) return res.status(404).json({ message: "File not found" });
    // delete file from S3
    const s3Params = {
      Bucket: awsS3.bucketName,
      Key: file.path
    };
    const response = await s3Client.send(new DeleteObjectCommand(s3Params));
    // delete file from database only if S3 delete is successful
    if (response.$metadata.httpStatusCode === 204) {
      await File.findByIdAndDelete(file._id);
      return res
        .status(204)
        .json({ message: "File deleted successfully", fileId: file._id });
    }
    res.status(500).json({ message: "Error deleting file" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
