const express = require("express");
const userController = require("../controllers/user");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const { validateRequest } = require("../middlewares/validator");
const { registerSchema, loginSchema } = require("../utils/schemas");
const Role = require("../utils/roles");

const router = express.Router();
/*

// get all users
router.get(
  "/",
  authenticateUser,
  authorizeUser([Role.ADMIN]),
  userController.getUsers
);

// TODO: update user by id

// TODO: delete user by id

// get current user data (upon login)
router.get(
  "/profile",
  authenticateUser,
  authorizeUser([Role.ADMIN, Role.OWNER, Role.CUSTOMER]),
  userController.getUserProfile
);

// edit current user data
router.put(
  "/profile",
  authenticateUser,
  authorizeUser([Role.ADMIN, Role.OWNER, Role.CUSTOMER]),
  userController.editUserProfile
);

// delete current user account
router.delete(
  "/profile",
  authenticateUser,
  authorizeUser([Role.ADMIN, Role.OWNER, Role.CUSTOMER]),
  userController.deleteUserProfile
);

router.post(
  "/register",
  // validateRequest(registerSchema),
  userController.registerUser
);

router.post("/requestRegistration", userController.registrationRequest);

// get all reg requests - admin
// router.get(
//   "/requests",
//   authenticateUser,
//   authorizeUser([Role.ADMIN]),
//   userController.getRegistrationRequests
// );
// submit reg request - admin
// delete reg requests - admin

*/

router.post("/resetPassword", userController.requestResetPassword);

module.exports = router;
