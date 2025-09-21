class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async findAll(options = {}) {
        return this.model.findAll(options);
    }

    async findById(id) {
        return this.model.findByPk(id);
    }

    async create(data) {
        return this.model.create(data);
    }

    async update(id, data) {
        const instance = await this.findById(id);
        if (!instance) return null;
        return instance.update(data);
    }

    async delete(id) {
        const instance = await this.findById(id);
        if (!instance) return null;
        return instance.destroy();
    }
}

module.exports = BaseRepository;
