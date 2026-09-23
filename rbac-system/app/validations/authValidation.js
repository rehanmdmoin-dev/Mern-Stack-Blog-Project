const Joi = require('joi');

const registerValidation = Joi.object({
    name: Joi.string().trim().min(2).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('admin', 'manager', 'employee').default('employee'),
    phone: Joi.string().trim().allow('', null),
}).options({ abortEarly: false });

const loginValidation = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
}).options({ abortEarly: false });

module.exports = { registerValidation, loginValidation };
