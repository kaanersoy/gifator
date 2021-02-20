const Joi = require('joi');

async function userValidation(userData) {
  const regex = `^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$`;

  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required().min(8).max(50),
    email: Joi.string().email().required(),
  });

  try {
    await schema.validateAsync(userData);
    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = { userValidation };
