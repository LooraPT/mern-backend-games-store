const authorService = require("./author-service");



class AuthorController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const type = await authorService.create(name);
            return res.json(type)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await authorService.getAll();
            return res.json(types)
        } catch (e) {
            next(e)
        }
    }

    async updateType(req, res, next) {
        try {
            const { name, newName } = req.body;
            const type = await authorService.updateType(name, newName)
            return res.json(type)
        } catch (e) {
            next(e)
        }
    }

    async deleteType(req, res, next) {
        try {
            const { name } = req.body;
            const type = await authorService.deleteType(name);
            return res.json(type)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthorController()