const Post = require("../models/postModel");

exports.getPosts = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const query = search ? { $text: { $search: search } } : {};

  const posts = await Post.find(query)
    .populate("author", "name email")
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Post.countDocuments(query);
  res.json({ total, page, posts });
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
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
};