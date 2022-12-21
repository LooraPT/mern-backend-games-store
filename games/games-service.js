const GamesModel = require('./games-model');
const OrderModel = require('../order/order-model');
const ApiError = require('../exceptions/api-error')
const fileService = require('../file/file-service')



class GamesService {
    async create(name, price, authorId, genreId, img, prePrice) {
        let fileName = fileService.createGamesImg(img);
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
        const device = await GamesModel.findById(id);
        if (!device) {
            throw ApiError.BadRequest('this game is not exists')
        }
        return device
    }

    async delete(id) {
        const game = await GamesModel.findById(id)
        if (!game) {
            throw ApiError.BadRequest('not found this game')
        }
        fileService.removeImg(game.img);
        const deleteGame = await GamesModel.findByIdAndDelete(id);
        return deleteGame;
    }

    async mostPopular() {
        try {
            const allOrder = await OrderModel.find()
            return allOrder
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new GamesService()