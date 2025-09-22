const BaseRepository = require("./BaseRepository");
const { Product } = require("../models");
const { Op } = require("sequelize");

class ProductRepository extends BaseRepository {
    constructor() {
        super(Product);
    }

    async findByNameOrCode(term) {
        console.log(`[REPOSITORY] Executando consulta no MySQL para o termo: "${term}"`);

        return this.model.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${term}%` } },
                    { code: { [Op.like]: `%${term}%` } },
                ],
            },
        });
    }
}

module.exports = new ProductRepository();
