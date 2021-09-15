const joi = require("joi");

module.exports = {
  register: joi.object({
    roleId: joi.number().min(1).max(3),
    firstName: joi
      .string()
      .required()
      .regex(/^[A-Za-z- ]+$/)
      .min(2)
      .max(25),
    lastName: joi
      .string()
      .required()
      .regex(/^[A-Za-z- ]+$/)
      .min(2)
      .max(25),
    email: joi.string().required().email(),
    phone: joi.string().required().min(6).max(20),
    password: joi
      .string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/),
    // should have one upper, lower and number; special characters are optional
  }),
  login: joi.object({
    email: joi.string().required().email(),
    password: joi
      .string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/),
  }),
};
