const cartService = require('../services/cartService');

class CartController {
    async listCart(req, res) {
        try {
            const userId = req.user.id;
            const cart = await cartService.listCart(userId);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addItem(req, res) {
        try {
            const userId = req.user.id;
            const { productId, quantity } = req.body;
            const newItem = await cartService.addItem(userId, productId, quantity);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateItem(req, res) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            const updatedItem = await cartService.updateItem(id, quantity);
            res.json(updatedItem);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async removeItem(req, res) {
        try {
            const { id } = req.params;
            await cartService.removeItem(id);
            return res.status(200).json({ message: "Item removido do carrinho com sucesso" });
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new CartController();
