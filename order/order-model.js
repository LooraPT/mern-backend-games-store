const { Schema, model } = require('mongoose');

const Order = new Schema({
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    home: { type: String, required: true },
    apartment: { type: String, required: true },
    comments: { type: String },
    gamesId: [{ type: Schema.Types.ObjectId, ref: 'Games' }]
})

module.exports = model('Order', Order);