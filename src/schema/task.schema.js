import Joi from "joi";

export const createTask = Joi.object({
   title: Joi.string().min(5).max(100).required(),
   description: Joi.string().min(10).max(250).required(),
   status: Joi.string().optional(),
   dueDate: Joi.date().required(),
});

export const updateTask = Joi.object({
   title: Joi.string().min(5).max(100).optional(),
   description: Joi.string().min(10).max(250).optional(),
   status: Joi.string().optional(),
   dueDate: Joi.date().optional(),
});