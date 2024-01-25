const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const updatedSubSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "missing field subscription",
    }),
});

const schemas = {
  registerSchema,
  loginSchema,
  updatedSubSchema,
};

module.exports = {
  ...schemas
};
