const express = require("express");
const {
  getShops,
  getSpecificShop,
  createShop,
  deleteShop,
} = require("../controllers/shop");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const { validateRequest } = require("../middlewares/validator");
const schema = require("../utils/schemas");
const Role = require("../utils/roles");

const router = express.Router();

router.get("/", authenticateUser, getShops);

router.get("/:slug", authenticateUser, getSpecificShop);

router.post(
  "/",
  authenticateUser,
  authorizeUser([Role.OWNER]),
  validateRequest(schema.createShop),
  createShop
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeUser([Role.OWNER]),
  deleteShop
);

module.exports = router;
