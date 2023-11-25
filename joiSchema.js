const Joi = require('joi');

const productSchema = Joi.object({
    name:Joi.string().required(),
    image:Joi.array().items(Joi.string()).required(),
    price:Joi.number().required(),
    description:Joi.string().required()
})

module.exports = productSchema;
