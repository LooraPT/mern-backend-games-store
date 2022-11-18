const gamesService = require('./games-service')


class GamesController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId } = req.body;
            const { img } = req.files;
            let prePrice = req.body.prePrice ? req.body.prePrice : ''
            const item = await gamesService.create(name, price, brandId, typeId, img, prePrice)
            return res.json(item)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            let { brandId, typeId, limit, page } = req.query;
            const devices = await gamesService.getAll(brandId, typeId, limit, page)
            res.json(devices)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const device = await gamesService.getOne(id);
            return res.json(device)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }

}

module.exports = new GamesController()