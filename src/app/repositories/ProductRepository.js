const BaseRepository = require("./BaseRepository");
const { Product } = require("../models");

class ProductRepository extends BaseRepository {
    constructor() {
        super(Product);
    }

    async findByNameOrCode(term) {
        return this.model.findAll({
            where: {
                [Product.sequelize.Op.or]: [
                    { name: { [Product.sequelize.Op.like]: `%${term}%` } },
                    { code: { [Product.sequelize.Op.like]: `%${term}%` } },
                ],
            },
        });
    }
}

module.exports = new ProductRepository();
