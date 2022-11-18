const { Schema, model } = require('mongoose');

const Games = new Schema({
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    prePrice: { type: Number },
    img: { type: String, required: true, unique: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'Author' },
    genreId: { type: Schema.Types.ObjectId, ref: 'Genre' },

})

module.exports = model('Games', Games);