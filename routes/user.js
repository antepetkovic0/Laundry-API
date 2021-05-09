const express = require("express");
const userController = require("../controllers/user");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const { validateRequest } = require("../middlewares/validator");
const { registerSchema, loginSchema } = require("../utils/schemas");
const Role = require("../utils/roles");

const router = express.Router();

// admin getting all users
router.get(
  "/",
  authenticateUser,
  authorizeUser([Role.ADMIN]),
  userController.getUsers
);

// get user data upon login
router.get("/profile", authenticateUser, userController.getUserProfile);

router.post(
  "/register",
  // validateRequest(registerSchema),
  userController.registerUser
);

router.post("/requestRegistration", userController.registrationRequest);

router.post("/login", userController.loginUser);

router.post("/resetPassword", userController.requestResetPassword);

module.exports = router;
