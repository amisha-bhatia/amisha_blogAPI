const joi = require("joi");

exports.postSchema = joi.object({
    title: joi.string().min(6).required(),
    content: joi.string().min(10).allow(""),
    author: joi.string().min(3),
    image: joi.string().uri().optional(),
    likes: joi.number().integer().positive()
})