const mongoose = require('mongoose')

var recommendationContentSchema = new mongoose.Schema({
    idUser: String,
    idRestaurant: String
});

module.exports = mongoose.model('recommendationcontents', recommendationContentSchema);