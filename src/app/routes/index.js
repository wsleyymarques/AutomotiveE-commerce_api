const express = require("express");
const router = express.Router();

const authRoutes = require("../routes/auth.routes");
const productRoutes = require("./product.routes");
const cartRoutes = require("./cart.routes");

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
