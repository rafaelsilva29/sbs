const mongoose = require('mongoose')

var recommendationPerUserSchema = new mongoose.Schema({
    idUser: String,
    idRestaurant: String
});

module.exports = mongoose.model('recommendationperusers', recommendationPerUserSchema);