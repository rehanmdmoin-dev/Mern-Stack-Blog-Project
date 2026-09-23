const Joi = require('joi');

const createTaskValidation = Joi.object({
    title: Joi.string().trim().min(3).required(),
    description: Joi.string().trim().allow('', null),
    assignedTo: Joi.string().required(),
    priority: Joi.string().valid('Low', 'Medium', 'High', 'Urgent'),
    dueDate: Joi.date().iso().allow(null),
}).options({ abortEarly: false });

const updateTaskValidation = Joi.object({
    title: Joi.string().trim().min(3),
    description: Joi.string().trim().allow('', null),
    priority: Joi.string().valid('Low', 'Medium', 'High', 'Urgent'),
    dueDate: Joi.date().iso().allow(null),
}).options({ abortEarly: false }).min(1);

const reassignTaskValidation = Joi.object({
    assignedTo: Joi.string().required(),
}).options({ abortEarly: false });

const changeStatusValidation = Joi.object({
    status: Joi.string().valid('Pending', 'In Progress', 'Completed', 'Rejected').required(),
}).options({ abortEarly: false });

const addCommentValidation = Joi.object({
    text: Joi.string().trim().min(1).required(),
}).options({ abortEarly: false });

module.exports = {
    createTaskValidation,
    updateTaskValidation,
    reassignTaskValidation,
    changeStatusValidation,
    addCommentValidation,
};
