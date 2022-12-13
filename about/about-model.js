const { Schema, model } = require('mongoose');

const About = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    img: { type: String, required: true, unique: true },
    text1: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    text2: { type: String, required: true, unique: true },
})

module.exports = model('About', About)