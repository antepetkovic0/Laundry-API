const express = require("express");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const dashboardController = require("../controllers/dashboard");
const roles = require("../utils/roles");

const router = express.Router();

router.get(
  "/users",
  authenticateUser,
  authorizeUser([roles.ADMIN]),
  dashboardController.countUsers
);

router.get("/shops", authenticateUser, dashboardController.countShops);

module.exports = router;
