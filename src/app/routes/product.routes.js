const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const upload = require("../../config/s3");

// Criar produto com imagem
router.post("/", upload.single("image"), ProductController.create.bind(ProductController));

// Listar produtos (com paginação)
router.get("/", ProductController.list.bind(ProductController));

// Buscar produtos
router.get("/search", ProductController.search.bind(ProductController));

// Atualizar produto
router.put("/:id", upload.single("image"), ProductController.update.bind(ProductController));

// Deletar produto
router.delete("/:id", ProductController.delete.bind(ProductController));

module.exports = router;
