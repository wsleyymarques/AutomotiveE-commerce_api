const cartService = require('../services/cartService');

class CartController {
    async listCart(req, res, next) {
        try {
            const userId = req.user.id;
            const cart = await cartService.listCart(userId);

            res.json({
                status: 'success',
                data: cart
            });
        } catch (error) {
            next(error);
        }
    }

    async addItem(req, res, next) {
        try {
            const userId = req.user.id;
            const { productId, quantity } = req.body;
            const newItem = await cartService.addItem(userId, productId, quantity);

            res.status(201).json({
                status: 'success',
                data: newItem
            });
        } catch (error) {
            next(error);
        }
    }

    async updateItem(req, res, next) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            const userId = req.user.id;
            const updatedItem = await cartService.updateItem(id, userId, quantity);

            res.json({
                status: 'success',
                data: updatedItem
            });
        } catch (error) {
            next(error);
        }
    }

    async removeItem(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            await cartService.removeItem(id, userId);

            res.status(200).json({
                status: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CartController();
