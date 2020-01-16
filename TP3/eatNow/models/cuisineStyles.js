const mongoose = require('mongoose')

var cuisineStyleSchema = new mongoose.Schema({
    CuisineStyle: String
});

module.exports = mongoose.model('cuisinestyles', cuisineStyleSchema);
