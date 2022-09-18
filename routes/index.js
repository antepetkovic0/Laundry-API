const express = require("express");

const authRoutes = require("./auth");
const dashboardRoutes = require("./dashboard");
const userRoutes = require("./users");
const shopRoutes = require("./shops");
const productRoutes = require("./products");
const orderRoutes = require("./orders");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/users", userRoutes);
router.use("/shops", shopRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
