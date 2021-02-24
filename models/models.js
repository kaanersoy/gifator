const Joi = require('joi');

async function userValidation(userData) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).trim().max(30).required(),
    password: Joi.string().required().min(8).trim().max(50),
    email: Joi.string().email().required().trim(),
  });
  try {
    await schema.validateAsync(userData);
    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = { userValidation };
