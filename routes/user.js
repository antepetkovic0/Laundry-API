const express = require("express");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const {
  getActiveUsers,
  getPendingUsers,
  approvePendingRequest,
  declinePendingRequest,
} = require("../controllers/user");
const Role = require("../utils/roles");

const router = express.Router();

router.get("/", authenticateUser, authorizeUser([Role.ADMIN]), getActiveUsers);

router.get(
  "/pending",
  authenticateUser,
  authorizeUser([Role.ADMIN]),
  getPendingUsers
);

router.post(
  "/pending",
  authenticateUser,
  authorizeUser([Role.ADMIN]),
  approvePendingRequest
);

router.delete(
  "/pending/:hash",
  authenticateUser,
  authorizeUser([Role.ADMIN]),
  declinePendingRequest
);

// TODO: update user by id

// TODO: delete user by id

// // get current user data (upon login)
// router.get(
//   "/profile",
//   authenticateUser,
//   authorizeUser([Role.ADMIN, Role.OWNER, Role.CUSTOMER]),
//   userController.getUserProfile
// );

// // edit current user data
// router.put(
//   "/profile",
//   authenticateUser,
//   authorizeUser([Role.ADMIN, Role.OWNER, Role.CUSTOMER]),
//   userController.editUserProfile
// );

// // delete current user account
// router.delete(
//   "/profile",
//   authenticateUser,
//   authorizeUser([Role.ADMIN, Role.OWNER, Role.CUSTOMER]),
//   userController.deleteUserProfile
// );

// router.post(
//   "/register",
//   // validateRequest(registerSchema),
//   userController.registerUser
// );

// router.post("/requestRegistration", userController.registrationRequest);

// get all reg requests - admin
// router.get(
//   "/requests",
//   authenticateUser,
//   authorizeUser([Role.ADMIN]),
//   userController.getRegistrationRequests
// );
// submit reg request - admin
// delete reg requests - admin

// router.post("/resetPassword", userController.requestResetPassword);

module.exports = router;
