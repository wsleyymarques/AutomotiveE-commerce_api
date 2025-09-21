const express = require("express");
const router = express.Router();

const authRoutes = require("../routes/auth.routes");
const productRoutes = require("./product.routes");


router.use("/auth", authRoutes);
router.use("/products", productRoutes);

module.exports = router;
