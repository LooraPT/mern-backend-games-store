const cartService = require('./cart-service')


class CartController {
    async addToCart(req, res, next) {
        try {
            const { id } = req.user;
            const { itemId } = req.body;
            const addItem = await cartService.addToCart(id, itemId)
            return res.json(addItem)
        } catch (e) {
            next(e)
        }
    }

    async removeItem(req, res, next) {
        try {
            const { id } = req.user;
            const { itemId } = req.body;
            const removeItem = await cartService.removeItem(id, itemId)
            return res.json(removeItem)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const { id } = req.user;
            const allItemInCart = await cartService.getAll(id);
            return res.json(allItemInCart)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new CartController()