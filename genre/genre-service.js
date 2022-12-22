const GenreModel = require('./genre-model')
const OrderModel = require('../order/order-model')
const GamesModel = require('../games/games-model')


class GenreService {
    async create(name) {
        const genre = await GenreModel.findOne({ name })
        if (genre) {
            throw ApiError.BadRequest('genre already exists')
        }
        const createGenre = await GenreModel.create({ name })
        return createGenre
    }

    async getAll() {
        const genres = await GenreModel.find()
        return genres
    }

    async updateGenre(name, newName) {
        const genre = await GenreModel.findOne({ name })
        if (!genre) {
            throw ApiError.BadRequest('genre is not define')
        }
        genre.name = newName;
        return genre.save()
    }

    async deleteGenreAndAllGames(name) {
        const genre = await GenreModel.findOne({ name })
        if (!genre) {
            throw ApiError.BadRequest(`this genre ${name} is not exists`)
        }
        const deleteGames = await GamesModel.deleteMany({ genreId: genre._id })
        const deleteGenre = await GenreModel.deleteOne({ name })
        return deleteGenre
    }

    async mostPopular() {
        try {
            const allOrder = await OrderModel.find()
            const allGenre = []
            for (let i = 0; i < allOrder.length; i++) {
                const order = allOrder[i];
                for (let j = 0; j < order.gamesId.length; j++) {
                    const game = await GamesModel.findById(order.gamesId[j])
                    if (game?.genreId) {
                        allGenre.push(game.genreId)
                    }
                }
            }
            allGenre.sort()

            let obj = {};
            for (let i = 0; i < allGenre.length; i++) {
                let key = allGenre[i];
                if (obj[key]) {
                    obj[key]++
                } else {
                    obj[key] = 1;
                }
            }

            let maxCount = 0;
            let maxElement = null;
            for (var key in obj) {
                if (maxCount < obj[key]) {
                    maxCount = obj[key];
                    maxElement = key;
                }
            }

            const popularGenre = await GenreModel.findById(maxElement)
            if (popularGenre) {
                return popularGenre
            }
            return null
        } catch (e) {
            console.log(e)
        }
    }

    popularGenre(array) {

    }
}

module.exports = new GenreService();