const router = require("express").Router();
const Client = require("../../models/client");
const Comment = require("../../models/comment");

// These routes will handle a client and their comments
// TODO: Write middleware to make sure client exists and is authorized to view project

// Client creates a comment
router.post("/:clientId/comments", async (req, res, next) => {
  const clientId = req.params.clientId;
  const { text } = req.body;
  try {
    const comment = await new Comment({
      text,
      clientId,
    }).save();

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
