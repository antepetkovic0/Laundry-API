const joi = require("joi");

module.exports = {
  register: joi.object({
    roleId: joi.number().min(2).max(3),
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
  googleAuth: joi.object({
    token: joi.string().required(),
    roleId: joi.number().min(2).max(3),
  }),
  createShop: joi.object({
    name: joi.string().required(),
    slug: joi.string().required().min(5).max(15),
    address: joi.string().required().min(10).max(40),
    image: joi.string().required(),
    about: joi.string(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
  }),
  createProduct: joi.object({
    shopId: joi.string().required(),
    name: joi.string().required(),
    slug: joi.string().required().min(5).max(15),
    price: joi.number().required(),
    discount: joi.number().min(1).max(99),
    image: joi.string().required(),
    content: joi.string(),
  }),
};
