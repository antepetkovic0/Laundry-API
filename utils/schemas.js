const joi = require("joi");

module.exports = {
  registerSchema: joi.object({
    firstName: joi
      .string()
      .required()
      .regex(/^[A-Za-z]+$/)
      .min(2)
      .max(15),
    lastName: joi
      .string()
      .required()
      .regex(/^[A-Za-z-]+$/)
      .min(2)
      .max(25),
    email: joi.string().required().email(),
    // fix phone number
    phoneNumber: joi.string().min(6).max(20),
    password: joi
      .string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/),
    // should have one upper, lower and number; special characters are optional
  }),
  loginSchema: joi.object({
    email: joi.string().required().email(),
    password: joi
      .string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/),
  }),
};
