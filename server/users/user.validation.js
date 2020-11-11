const Joi = require('joi');

const userValidation = Joi.object({
  firstName: Joi.string().required().min(2).max(13),
  lastName: Joi.string().required().min(5).max(50),
  email: Joi.string().email().required().min(5),
  provider: Joi.string().required(),
  password: Joi.string().min(6).regex(RegExp('^[a-zA-Z0-9]'))
    .message('You password is week'),
  resetPassword: Joi.string
});

module.exports = userValidation;
