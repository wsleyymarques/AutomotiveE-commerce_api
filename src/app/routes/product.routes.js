const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { upload } = require("../../config/s3");

const {
    validate,
    createProductRules,
    updateProductRules,
    validateIdParam,
} = require("../validators/productValidator");

router.get("/", ProductController.list.bind(ProductController));
router.get("/search", ProductController.search.bind(ProductController));

router.post("/",
    upload.single("image"),
    createProductRules(),
    validate,
    ProductController.create.bind(ProductController)
);

router.put("/:id",
    upload.single("image"),
    updateProductRules(),
    validate,
    ProductController.update.bind(ProductController)
);

router.delete("/:id",
    validateIdParam(),
    validate,
    ProductController.delete.bind(ProductController)
);

module.exports = router;
