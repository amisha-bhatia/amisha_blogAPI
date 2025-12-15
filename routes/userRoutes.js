const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const { registerSchema, loginSchema } = require("../validation/userValidation");
const validation = require("../middleware/validation");

router.post("/register", validation(registerSchema), registerUser);
router.post("/login",validation(loginSchema), loginUser);

module.exports = router;