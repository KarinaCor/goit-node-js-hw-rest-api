const Joi = require("joi");


const verifySchema = Joi.object({
  email: Joi.string()
 
    .required()
    .messages({ "any.required": "missing required field email" }),
});
module.exports = {
  verifySchema,
};
