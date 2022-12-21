const ApiError = require("../exceptions/api-error");
const OrderModel = require("./order-model");
const CartModel = require("../cart/cart-model")
const ItemsCartModel = require("../cart/items-cart-model")


class OrderService {
    async create(id, name, email, phone, country, street, city, apartment, house, comments) {
        try {
            const cartId = await CartModel.findOne({ user: id })
            const allItem = await ItemsCartModel.find({ cart: cartId._id })
            const orderCreate = await OrderModel.create({
                cart: cartId._id,
                user: id,
                name,
                email, phone,
                country, street,
                city,
                home: house,
                apartment,
                comments,
            })
            if (!allItem) {
                throw ApiError.BadRequest('not found games')
            }
            for (let i = 0; i < allItem.length; i++) {
                orderCreate.gamesId.push(allItem[i].item)
            }
            await orderCreate.save();
            await ItemsCartModel.deleteMany({ cart: cartId._id })
            return orderCreate;
        } catch (e) {
            console.log(e)
        }
    }

    async getOrder(orderId) {
        const order = await OrderModel.findById(orderId)
        if (!order) {
            throw ApiError.BadRequest('not found order')
        }
        return order;
    }


}

module.exports = new OrderService();