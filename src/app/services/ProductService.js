// src/app/services/ProductService.js
const productRepository = require("../repositories/ProductRepository");

class ProductService {
    async list({ page = 1, limit = 10 }) {
        const offset = (page - 1) * limit;

        const products = await productRepository.findAll({
            offset,
            limit,
            order: [["createdAt", "DESC"]],
        });

        return products;
    }

    async search(term) {
        if (!term) return [];
        const products = await productRepository.findByNameOrCode(term);
        return products;
    }

    async create(data) {
        const product = await productRepository.create(data);
        return product;
    }

    async update(id, data) {
        const updated = await productRepository.update(id, data);
        if (!updated) {
            const err = new Error("Produto não encontrado");
            err.status = 404;
            throw err;
        }
        return updated;
    }

    async delete(id) {
        const deleted = await productRepository.delete(id);
        if (!deleted) {
            const err = new Error("Produto não encontrado");
            err.status = 404;
            throw err;
        }
        return deleted;
    }
}

module.exports = new ProductService();
