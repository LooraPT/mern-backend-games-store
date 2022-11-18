const BrandModel = require('./genre-model')


class BrandService {
    async create(name) {
        const brand = await BrandModel.findOne({ name })
        if (brand) {
            throw ApiError.BadRequest('brand already exists')
        }
        const createBrand = await BrandModel.create({ name })
        return createBrand
    }

    async getAll() {
        const brands = await BrandModel.find()
        return brands
    }

    async updateBrand(name, newName) {
        const brand = await BrandModel.findOne({ name })
        if (!brand) {
            throw ApiError.BadRequest('brand is not define')
        }
        brand.name = newName;
        return brand.save()
    }

    async deleteBrand(name) {
        const brand = await BrandModel.findOne({ name })
        if (!brand) {
            throw ApiError.BadRequest(`this brand ${name} is not exists`)
        }
        const deleteBrand = await BrandModel.deleteOne({ name })
        return deleteBrand
    }
}

module.exports = new BrandService();