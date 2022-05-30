const express = require("express");
const authController = require("../controllers/auth");
const { validateRequest } = require("../middlewares/validator");
const schema = require("../utils/schemas");

const router = express.Router();

router.post(
  "/register",
  validateRequest(schema.register),
  authController.registerUser
);

router.post("/login", validateRequest(schema.login), authController.loginUser);

router.post("/refresh", authController.refreshTokens);

module.exports = router;
