const Joi = require('joi');

const taskValidation = Joi.object({
  title: Joi.string().required().min(2).max(13),
  body: Joi.string().required().min(5).max(50),
  status: Joi.boolean().required()
});

module.exports = taskValidation;
