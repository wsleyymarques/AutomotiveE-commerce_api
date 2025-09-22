const productRepository = require("../repositories/ProductRepository");

class ProductService {
    async list({ page = 1, limit = 10 }) {
        page = Number(page);
        limit = Number(limit);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1 || limit > 100) limit = 10;

        const offset = (page - 1) * limit;

        const { count, rows } = await productRepository.model.findAndCountAll({
            offset,
            limit,
            order: [["createdAt", "DESC"]],
        });

        const totalPages = Math.ceil(count / limit);

        return {
            products: rows,
            pagination: {
                totalItems: count,
                totalPages,
                currentPage: page,
            }
        };
    }

    async search(term) {
        console.log(`[SERVICE] Serviço de busca chamado com o termo: "${term}"`);
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
