// Files are only attached to projects
// Routes start with /api/projects/:projectId/uploads
const router = require("express").Router({ mergeParams: true });
const {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
const multer = require("multer");
const multerS3 = require("multer-s3");
const File = require("../../models/file");
const Project = require("../../models/project");
const { awsS3, cloudFront } = require("../../config");
const { s3Client } = require("../../config/aws-s3.config");

// const { uploadToS3 } = require("../../config/aws-s3.config");

// config for multer-s3 storage. allows for storage str8 to aws
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: awsS3.bucketName,
    key: (req, file, cb) => {
      const { projectId } = req.params;
      cb(null, `projects/${projectId}/${file.originalname}`);
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

// // File middleware
// const storage = multer.memoryStorage();

// // check if file is an audio file
// const fileFilter = (_req, file, cb) => {
//   if (file.mimetype.split("/")[0] === "audio") {
//     cb(null, true);
//   } else {
//     cb(new multer.MulterError("File must be an audio file"), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter
// });

// Upload files and create a new file object for each file uploaded
router.post("/", upload.array("tracks"), async (req, res, next) => {
  console.log(req.headers["content-type"]);
  const { projectId } = req.params;
  const files = req.files;
  console.log(files);
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
    // const s3Results = await uploadToS3(files, projectId);
    // console.log("S3 upload results: ", s3Results);
    // const fileResults = await Promise.all(
    //   files.map(async (file, index) => {
    //     let s3Result = s3Results[index];
    //     return await new File({
    //       name: file.originalname,
    //       size: file.size,
    //       type: file.mimetype.split("/")[1],
    //       projectId,
    //       path: s3Result.objectUrl
    //     }).save();
    //   })
    // );
    // console.log("Files saved to database: ", fileResults);
    // return res.status(201).json({
    //   message: "Files uploaded successfully",
    //   files: fileResults
    // });
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

    // Legacy code for streaming file from S3 (from server)
    // const key = `uploads/${projectId}/${fileName}`;
    // const response = await s3Client.send(
    //   new GetObjectCommand({
    //     Bucket: awsS3.bucketName,
    //     Key: key
    //   })
    // );

    // // Set client headers for playback. The stream comes directly from server
    // res.setHeader("Content-Type", response.ContentType);
    // res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);

    // // Pipe response stream to HTTP response
    // response.Body.pipe(res);
    // response.Body.on("end", () => {
    //   console.log("Stream ended");
    // });
    // response.Body.on("error", (err) => {
    //   console.error("Stream error:", err);
    //   res.status(500).json({ message: "Error streaming file" });
    // });
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
