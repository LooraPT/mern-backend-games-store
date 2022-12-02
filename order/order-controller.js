const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const OrderService = require('./order-service')

class OrderController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('incorrectly completed form', errors.array()))
            }
            const { id } = req.user;
            const { name, email, phone, country, street, city, apartment, house, comments } = req.body;
            const order = await OrderService.create(id, name, email, phone, country, street, city, apartment, house, comments);
            return res.json(order)
        } catch (e) {
            next(e)
        }
    }

    async getOrder(req, res, next) {
        try {
            const { orderId } = req.query;
            const order = await OrderService.getOrder(orderId);
            return res.json(order)
        } catch (e) {
            next(e)
        }
    }



}

module.exports = new OrderController()