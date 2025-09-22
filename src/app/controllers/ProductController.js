const productService = require("../services/ProductService");
const { uploadToS3 } = require("../../config/s3");

class ProductController {
    async list(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const result = await productService.list({ page, limit });

            return res.json({
                status: "success",
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    async search(req, res, next) {
        try {
            const { q } = req.query;
            const products = await productService.search(q);

            return res.json({
                status: "success",
                data: products,
            });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const { name, code, price } = req.body;
            let imageUrl = null;

            if (req.file) {
                imageUrl = await uploadToS3(req.file);
            }

            const product = await productService.create({ name, code, price, imageUrl });

            return res.status(201).json({
                status: "success",
                data: product,
            });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const updated = await productService.update(id, req.body);

            return res.json({
                status: "success",
                data: updated,
            });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await productService.delete(id);

            return res.status(200).json({
                status: "success",
                data: null,
            });
        } catch (err)
        {
            next(err);
        }
    }
}

module.exports = new ProductController();
