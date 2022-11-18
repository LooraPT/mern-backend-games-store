const { Schema, model } = require('mongoose');

const ItemsCart = new Schema({
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
})

module.exports = model('ItemsCart', ItemsCart);