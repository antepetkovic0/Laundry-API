const express = require("express");
const { getShops } = require("../controllers/shop");
const { authenticateUser } = require("../middlewares/authenticate");
const { authorizeUser } = require("../middlewares/authorize");
const { validateRequest } = require("../middlewares/validator");
const schema = require("../utils/schemas");
const Role = require("../utils/roles");

const router = express.Router();

router.get("/", authenticateUser, authorizeUser(), getShops);

module.exports = router;
