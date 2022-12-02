const genreService = require('./genre-service')

class GenreController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const genre = await genreService.create(name);
            return res.json(genre)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const genres = await genreService.getAll();
            return res.json(genres)
        } catch (e) {
            next(e)
        }
    }

    async updateGenre(req, res, next) {
        try {
            const { name, newName } = req.body;
            const genre = await genreService.updateGenre(name, newName)
            return res.json(genre)
        } catch (e) {
            next(e)
        }
    }

    async deleteGenre(req, res, next) {
        try {
            const { name } = req.body;
            const genre = await genreService.deleteGenre(name);
            return res.json(genre)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new GenreController()