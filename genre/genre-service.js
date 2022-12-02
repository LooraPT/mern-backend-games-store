const GenreModel = require('./genre-model')


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

    async deleteGenre(name) {
        const genre = await GenreModel.findOne({ name })
        if (!genre) {
            throw ApiError.BadRequest(`this genre ${name} is not exists`)
        }
        const deleteGenre = await GenreModel.deleteOne({ name })
        return deleteGenre
    }
}

module.exports = new GenreService();