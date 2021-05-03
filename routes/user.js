const express = require("express");
const userController = require("../controllers/user");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const { validateRequest } = require("../middlewares/validator");
const { registerSchema, loginSchema } = require("../utils/schemas");
const Role = require("../utils/roles");

const router = express.Router();

router.get(
  "/",
  authenticateUser,
  authorizeUser([Role.ADMIN]),
  userController.getUsers
);

router.post(
  "/register",
  // validateRequest(registerSchema),
  userController.registerUser
);

router.post("/login", userController.loginUser);

module.exports = router;
