const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

/* =========================
   COMMENTS
========================= */

exports.addComment = async (req, res) => {
  try {
    const { content, parent } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Comment content required" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      content,
      user: req.user.id,
      post: post._id,
      parent: parent || null
    });

    const populatedComment = await comment.populate("user", "name");

    res.status(201).json({
      success: true,
      comment: populatedComment
    });
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

exports.getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.id,
      isDeleted: false
    })
      .populate("user", "name")
      .populate("parent", "content user")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      comments
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (
      comment.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    comment.isDeleted = true;
    await comment.save();

    res.json({
      success: true,
      message: "Comment deleted"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
