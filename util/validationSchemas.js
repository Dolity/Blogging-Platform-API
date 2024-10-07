const joi = require('joi');

const postSchema = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    category: joi.string().required(),
    tags: joi.array().items(joi.string()).min(1).required()
})

module.exports = postSchema;