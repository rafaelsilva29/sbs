const mongoose = require('mongoose')

var reviewSchema = new mongoose.Schema({
    idUser: String,
    idRestaurant: String,
    NameRestaurant: String,
    Rating: String,
    Date: String,
    NameUser: String,
    Comment: String,
    ShortComment: String
});

module.exports = mongoose.model('reviews', reviewSchema);