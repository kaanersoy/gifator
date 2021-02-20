const Joi = require('joi');

function userValidation(userData) {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        birth_year: Joi.number()
            .integer()
            .min(1900)
            .max(2013),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })

    try {
        return await schema.validateAsync(user);
    }
    catch (err) { 
        return err;
    }
}

module.exports = { userValidation }