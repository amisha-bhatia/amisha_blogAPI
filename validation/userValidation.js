const joi = require("joi");

exports.registerSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string()
        .min(8)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
        .required()
        .messages({
            "string.pattern.base": "Password must include uppercase, lowercase, number, and special character"
        })
});

exports.loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});