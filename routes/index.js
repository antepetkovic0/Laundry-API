const express = require("express");

const authRoutes = require("./auth");
const userRoutes = require("./user");
const shopRoutes = require("./shop");

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/shops", shopRoutes);

module.exports = router;
