const Joi = require('joi');

const createUserValidation = Joi.object({
    name: Joi.string().trim().min(2).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('admin', 'manager', 'employee').required(),
    phone: Joi.string().trim().allow('', null),
}).options({ abortEarly: false });

const updateUserValidation = Joi.object({
    name: Joi.string().trim().min(2),
    email: Joi.string().trim().email(),
    phone: Joi.string().trim().allow('', null),
}).options({ abortEarly: false }).min(1);

const assignRoleValidation = Joi.object({
    role: Joi.string().valid('admin', 'manager', 'employee').required(),
}).options({ abortEarly: false });

module.exports = { createUserValidation, updateUserValidation, assignRoleValidation };
