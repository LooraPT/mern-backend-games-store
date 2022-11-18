const { Schema, model } = require('mongoose');

const Order = new Schema({
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    home: { type: String, required: true },
    apartment: { type: String, required: true },

})

module.exports = model('Order', Order);