const cartRepository = require('../repositories/cartRepository');

class CartService {
    async listCart(userId) {
        return cartRepository.findByUser(userId);
    }

    async addItem(userId, productId, quantity) {
        const existingItem = await cartRepository.model.findOne({
            where: { userId, productId }
        });

        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            return existingItem;
        }

        return cartRepository.create({ userId, productId, quantity });
    }

    async updateItem(id, userId, quantity) {
        const item = await cartRepository.model.findOne({ where: { id, userId } });

        if (!item) {
            const err = new Error('Item não encontrado ou não pertence ao usuário');
            err.status = 404;
            throw err;
        }

        item.quantity = quantity;
        await item.save();
        return item;
    }

    async removeItem(id, userId) {
        const item = await cartRepository.model.findOne({ where: { id, userId } });

        if (!item) {
            const err = new Error('Item não encontrado ou não pertence ao usuário');
            err.status = 404;
            throw err;
        }

        await item.destroy();
        return true;
    }
}

module.exports = new CartService();
