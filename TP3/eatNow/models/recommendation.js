const mongoose = require('mongoose')

var recommendationSchema = new mongoose.Schema({
    idUser: String,
    idRestaurant: String
});

module.exports = mongoose.model('recommendations', recommendationSchema);