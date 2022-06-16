const express = require("express");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const {
  getDashboardUsers,
  getDashboardShops,
} = require("../controllers/dashboard");
const roles = require("../utils/roles");

const router = express.Router();

router.get(
  "/users",
  authenticateUser,
  authorizeUser([roles.ADMIN]),
  getDashboardUsers
);

router.get("/shops", authenticateUser, getDashboardShops);

module.exports = router;
