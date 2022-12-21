const gamesService = require('./games-service')


class GamesController {
    async create(req, res, next) {
        try {
            const { name, price, genreId, authorId } = req.body;
            const { img } = req.files;
            let prePrice = req.body.prePrice ? req.body.prePrice : ''
            const item = await gamesService.create(name, price, genreId, authorId, img, prePrice)
            return res.json(item)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            let { genreId, authorId, limit, page } = req.query;
            const devices = await gamesService.getAll(genreId, authorId, limit, page)
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
            const { id } = req.params;
            const deleteGame = await gamesService.delete(id)
            return res.json(deleteGame);
        } catch (e) {
            next(e)
        }
    }

    async popular(req, res, next) {
        try {
            const games = await gamesService.mostPopular();
            res.json(games)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new GamesController()