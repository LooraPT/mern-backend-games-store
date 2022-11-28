const ApiError = require("../exceptions/api-error");
const AuthorModel = require("./author-model");



class TypeService {
    async create(name) {
        const type = await AuthorModel.findOne({ name })
        if (type) {
            throw ApiError.BadRequest('type already exists')
        }
        const createType = await AuthorModel.create({ name })
        return createType
    }

    async getAll() {
        const types = await AuthorModel.find()
        return types
    }

    async updateType(name, newName) {
        const type = await AuthorModel.findOne({ name })
        if (!type) {
            throw ApiError.BadRequest('type is not define')
        }
        type.name = newName;
        return type.save()
    }

    async deleteType(name) {
        const type = await AuthorModel.findOne({ name })
        if (!type) {
            throw ApiError.BadRequest(`this type ${name} is not exists`)
        }
        const deleteType = await AuthorModel.deleteOne({ name })
        return deleteType
    }
}

module.exports = new TypeService();