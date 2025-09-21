// src/app/controllers/ProductController.js
const productService = require("../services/ProductService");
const upload = require("../../config/s3");

class ProductController {
    async list(req, res) {
        try {
            const { page, limit } = req.query;
            const products = await productService.list({ page: Number(page), limit: Number(limit) });
            return res.json(products);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async search(req, res) {
        try {
            const { q } = req.query;
            const products = await productService.search(q);
            return res.json(products);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const { name, code, price } = req.body;
            const imageUrl = req.file ? req.file.location : null;

            const product = await productService.create({
                name,
                code,
                price,
                imageUrl,
            });

            return res.status(201).json(product);
        } catch (err) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updated = await productService.update(id, req.body);
            return res.json(updated);
        } catch (err) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await productService.delete(id);
            return res.json({ message: "Produto deletado com sucesso" });
        } catch (err) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }
}

module.exports = new ProductController();
