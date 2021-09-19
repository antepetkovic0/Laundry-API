const express = require("express");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const { validateRequest } = require("../middlewares/validator");
const { createProduct, deleteProduct } = require("../controllers/product");
const schema = require("../utils/schemas");
const Role = require("../utils/roles");

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser([Role.OWNER]),
  validateRequest(schema.createProduct),
  createProduct
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeUser([Role.OWNER]),
  deleteProduct
);

module.exports = router;
