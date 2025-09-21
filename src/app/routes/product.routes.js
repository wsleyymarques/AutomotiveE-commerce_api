const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const upload = require("../../config/s3");

router.post("/", upload.single("image"), ProductController.create.bind(ProductController));

router.get("/", ProductController.list.bind(ProductController));

router.get("/search", ProductController.search.bind(ProductController));

router.put("/:id", upload.single("image"), ProductController.update.bind(ProductController));

router.delete("/:id", ProductController.delete.bind(ProductController));

module.exports = router;
