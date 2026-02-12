const joi = require("joi");

const createProductSchema = joi.object({
   name: joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Product name is required",
    "string.min": "Product name must be at least 2 characters",
    "string.max": "Product name cannot exceed 100 characters",
    "any.required": "Product name is required",
  }),

category: joi.string()
    .valid("Electronics", "Fashion", "Furniture")
    .required()
    .messages({
      "string.empty": "Category is required",
      "any.only": "Category must be Electronics, Fashion, or Furniture",
      "any.required": "Category is required",
    }),

  price: joi.number().positive().precision(2).required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
});

module.exports = {
  createProductSchema
};