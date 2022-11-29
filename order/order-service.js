const ApiError = require("../exceptions/api-error");
const OrderModel = require("./order-model");
const CartModel = require("../cart/cart-model")


class OrderService {
    async create(id, name, email, phone, country, street, city, apartment, house, comments) {
        const cartId = await CartModel.findOne({ user: id })
        const orderCreate = await OrderModel.create({ cart: cartId._id, user: id, name, email, phone, country, street, city, home: house, apartment, comments })
        return orderCreate;
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