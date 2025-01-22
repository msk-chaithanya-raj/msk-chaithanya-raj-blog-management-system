const express = require("express");
const {
  createComment,
  getCommentsByBlogId,
} = require("../controllers/commentController");
const router = express.Router();

router.post("/", createComment);
router.get("/:blogId", getCommentsByBlogId);

module.exports = router;
