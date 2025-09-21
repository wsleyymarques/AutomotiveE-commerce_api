// src/app/controllers/ProductController.js
const productService = require("../services/ProductService");
const { upload, uploadToS3 } = require("../../config/s3");
class ProductController {
    async list(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const products = await productService.list({
                page: Number(page),
                limit: Number(limit)
            });
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
            let imageUrl = null;

            if (req.file) {
                imageUrl = await uploadToS3(req.file);
            }

            const product = await productService.create({ name, code, price, imageUrl });
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
