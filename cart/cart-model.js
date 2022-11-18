const { Schema, model } = require('mongoose');

const Cart = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Cart', Cart);