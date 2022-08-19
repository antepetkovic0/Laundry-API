const express = require("express");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const { validateRequest } = require("../middlewares/validator");
const schema = require("../utils/schemas");
const shopController = require("../controllers/shops");
const Role = require("../utils/roles");

const router = express.Router();

router.get("/", authenticateUser, shopController.getShops);

router.get("/:slug", authenticateUser, shopController.getSpecificShop);

router.post(
  "/",
  authenticateUser,
  authorizeUser([Role.OWNER]),
  validateRequest(schema.createShop),
  shopController.createShop
);

router.put(
  "/",
  authenticateUser,
  authorizeUser([Role.OWNER]),
  shopController.editShop
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeUser([Role.OWNER]),
  shopController.deleteShop
);

module.exports = router;
