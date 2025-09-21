const BaseRepository = require('./baseRepository');
const { CartItem, Product } = require('../models');

class CartRepository extends BaseRepository {
    constructor() {
        super(CartItem);
    }

    async findByUser(userId) {
        return this.model.findAll({
            where: { userId },
            include: [{
                model: this.model.sequelize.models.Product,
                as: 'product',
                attributes: ['id', 'name', 'price', 'imageUrl']
            }]
        });
    }
}

module.exports = new CartRepository();
