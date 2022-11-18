const ApiError = require("../exeptions/api-error");
const CartModel = require("./cart-model");
const ItemModel = require("../games/games-model");
const ItemsCart = require('./items-cart-model')


class CartService {
    async addToCart(id, itemId) {
        if (!id || !itemId) {
            throw ApiError.UnauthorizedError()
        }
        const checkItem = await ItemModel.findById(itemId)
        if (!checkItem) {
            throw ApiError.BadRequest('item i not defined')
        }
        const { _id } = await CartModel.findOne({ user: id });
        const addItemToCart = await ItemsCart.create({ cart: _id, item: itemId })
        return addItemToCart;

    }

    async removeItem(id, itemId) {
        if (!id || !itemId) {
            throw ApiError.UnauthorizedError()
        }
        const { _id } = await CartModel.findOne({ user: id });
        const itemInCart = await ItemsCart.findOne({ cart: _id, item: itemId })
        if (!itemInCart) {
            throw ApiError.BadRequest("you don't have this item in your cart")
        }
        const deleteItemCart = await ItemsCart.deleteOne({ cart: _id, item: itemId })
        return deleteItemCart;
    }

    async getAll(id) {
        const { _id } = await CartModel.findOne({ user: id });
        const itemsCart = await ItemsCart.find({ cart: _id })
        if (!itemsCart) {
            return {}
        }

        const items = []

        for (let i = 0; i < itemsCart.length; i++) {
            let a = itemsCart[i]
            const b = await ItemModel.findById(a.item)
            items.push(b)
        }

        return items;
    }

}

module.exports = new CartService()