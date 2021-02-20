const Joi = require('joi');

async function userValidation(userData) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(5).max(50),
    email: Joi.string().email(),
  });

  try {
    return await schema.validateAsync(userData);
  } catch (err) {
    return err.message;
  }
}

module.exports = { userValidation };
