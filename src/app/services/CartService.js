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

    async updateItem(id, quantity) {
        const item = await cartRepository.findById(id);
        if (!item) throw new Error('Item não encontrado');
        return cartRepository.update(id, { quantity });
    }

    async removeItem(id) {
        const item = await cartRepository.findById(id);
        if (!item) throw new Error('Item não encontrado');
        return cartRepository.delete(id);
    }
}

module.exports = new CartService();
