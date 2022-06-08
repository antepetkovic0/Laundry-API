const express = require("express");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const userController = require("../controllers/users");
const Role = require("../utils/roles");

const router = express.Router();

router.get(
  "/",
  authenticateUser,
  authorizeUser([Role.ADMIN]),
  userController.getUsers
);

router.post(
  "/pending",
  authenticateUser,
  authorizeUser([Role.ADMIN]),
  userController.approvePendingRequest
);

router.delete(
  "/pending/:hash",
  authenticateUser,
  authorizeUser([Role.ADMIN]),
  userController.declinePendingRequest
);

module.exports = router;
