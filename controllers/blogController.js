const Blog = require("../models/Blog");

// Create a new blog post
exports.createBlog = async (req, res) => {
  const { title, content, author, assignedEditor } = req.body;
  try {
    const blog = new Blog({ title, content, author, assignedEditor });
    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author assignedEditor");
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author assignedEditor"
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a blog post
exports.updateBlog = async (req, res) => {
  const { title, content, assignedEditor } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.assignedEditor = assignedEditor || blog.assignedEditor;
    blog.updatedAt = Date.now();

    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a blog post
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
