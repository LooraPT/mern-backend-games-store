const brandService = require('./genre-service')

class BrandController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const brand = await brandService.create(name);
            return res.json(brand)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await brandService.getAll();
            return res.json(brands)
        } catch (e) {
            next(e)
        }
    }

    async updateBrand(req, res, next) {
        try {
            const { name, newName } = req.body;
            const brand = await brandService.updateBrand(name, newName)
            return res.json(brand)
        } catch (e) {
            next(e)
        }
    }

    async deleteBrand(req, res, next) {
        try {
            const { name } = req.body;
            const brand = await brandService.deleteBrand(name);
            return res.json(brand)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new BrandController()