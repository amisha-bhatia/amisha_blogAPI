const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const upload = require("../middleware/multer");

// POSTS
router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.post("/", auth, upload.single("image"), postController.createPost);
router.put("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);

// LIKES
router.post("/:id/like", auth, postController.likePost);

// COMMENTS
router.get("/:id/comments", commentController.getPostComments);
router.post("/:id/comments", auth, commentController.addComment);

module.exports = router;
