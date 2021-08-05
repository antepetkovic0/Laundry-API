const express = require("express");

const userRoutes = require("./user");
const registerRoutes = require("./register");

const router = express.Router();
// router.use("/users", userRoutes);
router.use("/register", registerRoutes);

module.exports = router;
