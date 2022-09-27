const express = require("express");
const { validateRequest } = require("../middlewares/validator");
const schema = require("../utils/schemas");
const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  validateRequest(schema.register),
  authController.registerUser
);

router.post("/login", validateRequest(schema.login), authController.loginUser);

router.post("/refresh-tokens", authController.refreshTokens);

router.post("/request-reset-password", authController.requestResetPassword);

router.post("/reset-password", authController.resetPassword);

module.exports = router;
