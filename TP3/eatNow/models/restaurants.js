const mongoose = require('mongoose')

var resturantSchema = new mongoose.Schema({
    Name: String,
    City: String,
    Ranking: Number,
    Rating: Number,
    cuisineStyles: [String],
    priceRange: [String],
    numberReviews: Number,
});

module.exports = mongoose.model('restaurants', resturantSchema);
