const Comment = require("../models/Comment");

// Create a new comment
exports.createComment = async (req, res) => {
  const { content, author, blog } = req.body;
  try {
    const comment = new Comment({ content, author, blog });
    await comment.save();
    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all comments for a specific blog
exports.getCommentsByBlogId = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId }).populate(
      "author"
    );
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
