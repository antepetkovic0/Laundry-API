const express = require("express");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const userController = require("../controllers/users");
const ROLE = require("../utils/roles");

const router = express.Router();

router.get(
  "/",
  authenticateUser,
  authorizeUser([ROLE.ADMIN]),
  userController.getUsers
);

router.delete(
  "/:hash",
  authenticateUser,
  authorizeUser([ROLE.ADMIN]),
  userController.deleteUser
);

router.post(
  "/pending",
  authenticateUser,
  authorizeUser([ROLE.ADMIN]),
  userController.approveUser
);

module.exports = router;
