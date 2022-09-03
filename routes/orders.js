const express = require("express");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const orderController = require("../controllers/orders");
const Role = require("../utils/roles");

const router = express.Router();

router.get("/", authenticateUser, orderController.getOrders);

router.post(
  "/",
  authenticateUser,
  authorizeUser([Role.CUSTOMER]),
  orderController.createOrder
);

module.exports = router;
