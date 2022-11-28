const uuid = require('uuid')
const path = require('path')
const GamesModel = require('./games-model')
const ApiError = require('../exceptions/api-error')



class GamesService {
    async create(name, price, authorId, genreId, img, prePrice) {
        let fileName = uuid.v4() + '.jpg'
        console.log(prePrice)
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const item = prePrice
            ? await GamesModel.create({ name, price, authorId, genreId, img: fileName, prePrice })
            : await GamesModel.create({ name, price, authorId, genreId, img: fileName })

        return item
    }

    async getAll(brandId, typeId, limit, page) {
        page = page || 1;
        limit = limit || 4;
        let skip = page * limit - limit
        let devices;
        let countDevice;
        if (!brandId && !typeId) {
            devices = await GamesModel.find().limit(limit).skip(skip)
            countDevice = await GamesModel.find().count()
        }

        if (brandId && !typeId) {
            devices = await GamesModel.find({ brandId }).limit(limit).skip(skip)
            countDevice = await GamesModel.find({ brandId }).count()
        }

        if (!brandId && typeId) {
            devices = await GamesModel.find({ typeId }).limit(limit).skip(skip)
            countDevice = await GamesModel.find({ typeId }).count()
        }

        if (brandId && typeId) {
            devices = await GamesModel.find({ brandId, typeId }).limit(limit).skip(skip)
            countDevice = await GamesModel.find({ brandId, typeId }).count()
        }
        return { count: countDevice, rows: devices }
    }

    async getOne(id) {
        const device = await GamesModel.findById(id)
        return device
    }

    async delete(name) {
        const game = await GamesModel.findOne({ name })
        if (!game) {
            throw ApiError.BadRequest('not found this game')
        }
        const deleteGame = await GamesModel.deleteOne({ name })
        return deleteGame
    }

    async update() {

    }

}

module.exports = new GamesService()