const BaseRepository = require("./BaseRepository");
const { User } = require("../models");

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return this.model.findOne({ where: { email } });
    }
}

module.exports = new UserRepository();
