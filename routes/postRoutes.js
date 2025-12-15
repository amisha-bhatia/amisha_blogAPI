const express = require("express");
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost } = require("../controllers/postController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const roleAuth = require("../middleware/roleAuth");
const { postSchema } = require("../validation/postValidation");
const validation = require("../middleware/validation");

router.get("/", getPosts);
router.post("/", auth, upload.single("image"),validation(postSchema), createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, roleAuth("admin"), deletePost);

module.exports = router;