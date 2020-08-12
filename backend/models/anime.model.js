const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animeSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;