const { Schema, model } = require('mongoose');

const Genre = new Schema({
    name: { type: String, required: true, unique: true }
})

module.exports = model('Genre', Genre);