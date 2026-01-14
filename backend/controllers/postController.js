const Post = require("../models/postModel");

exports.getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;
    const query = search ? { $text: { $search: search } } : {};

    const posts = await Post.find(query)
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Post.countDocuments(query);

    res.json({ total, page, posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      author: req.user.id,
      image: req.file?.filename
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(post);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
};

exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const userId = req.user.id;

  if (post.likes.includes(userId)) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();

  res.json({
    success: true,
    likes: post.likes.length
  });
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email")
      .populate("likes", "name"); // optional
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};