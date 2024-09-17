const router = require("express").Router();
const Project = require("../../models/project");
const User = require("../../models/user");
const { requireAuth } = require("../../utils/auth");

// // Get projects for user logged in
// // GET /api/projects
// // user must be logged in
// router.get("/", requireAuth, async (req, res, next) => {
//   const userId = req.user._id;
//   const projects = await Project.find({ userId });

//   res.json(projects);
// });

// test project form page
// GET /api/projects/test
router.get("/", requireAuth, async (req, res, next) => {
  const userId = req.user._id;
  const projects = await Project.find({ userId }).populate("userId");
  console.log(projects);
  res.render("projects", { projects, user: req.user });
});

// Create a project
// POST /api/projects
// user must be logged in
router.post("/", requireAuth, async (req, res, next) => {
  const userId = req.user._id;
  const { title, description, projectAmount } = req.body;

  if (!title) {
    return res.status(400).json({
      errorMessage: "Please enter a title",
    });
  }

  try {
    const newProject = await new Project({
      title,
      description: description || null,
      userId,
      projectAmount: projectAmount || 0,
      paymentStatus: projectAmount ? "unpaid" : "no-charge",
      userId,
    }).save();

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

// Get a single project
// GET /api/projects/:projectId
// user must be logged in
router.get("/:projectId", requireAuth, async (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.user._id.toString();

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // check if project belongs to user
    if (project.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to view this project",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

//Test project update form page
// GET /api/projects/:projectId/new
router.get("/:projectId/update", requireAuth, async (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.user._id.toString();
  const project = await Project.findById(projectId);
  res.render("projectForm", { project, user: req.user });
});

// Update project details
// PUT /api/projects/:projectId
// user must be logged in
// project must be owned by user
router.put("/:projectId", requireAuth, async (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.user._id.toString();

  const {
    title,
    description,
    status,
    projectAmount,
    amountPaid,
    paymentStatus,
  } = req.body;

  try {
    const existingProject = await Project.findById(projectId);

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found ",
      });
    }

    // check if project belongs to user
    if (existingProject.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to update this project",
      });
    }

    existingProject.title = title || existingProject.title;
    existingProject.description = description || existingProject.description;
    existingProject.status = status || existingProject.status;
    existingProject.projectAmount =
      projectAmount || existingProject.projectAmount;

    let messages = {};

    if (!amountPaid) {
      existingProject.amountPaid = existingProject.amountPaid || 0;
    }
    // update payment status
    if (amountPaid && amountPaid > 0) {
      existingProject.amountPaid = Number(amountPaid);

      if (existingProject.amountPaid > existingProject.projectAmount) {
        existingProject.paymentStatus = "overpaid";
      } else if (existingProject.amountPaid === existingProject.projectAmount) {
        existingProject.paymentStatus = "paid";
      } else {
        existingProject.paymentStatus = "partially-paid";
      }
    }

    if (existingProject.amountPaid > existingProject.projectAmount) {
      messages["Overpayment amount warning"] =
        "Total amount paid is greater than project amount";
    }

    const updatedProject = await existingProject.save();

    const results = {
      ...updatedProject._doc,
      messages,
    };

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

// Delete a project
// DELETE /api/projects/:projectId
// user must be logged in
// project must be owned by user
router.delete("/:projectId", requireAuth, async (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.user._id.toString();

  try {
    const existingProject = await Project.findById(projectId);

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found ",
      });
    }

    // check if project belongs to user
    if (existingProject.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to delete this project",
      });
    }

    const deletedProject = await Project.findByIdAndDelete(projectId);

    res
      .status(200)
      .json({ message: "Successfully deleted project", deletedProject });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
