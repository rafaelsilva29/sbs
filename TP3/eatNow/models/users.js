const mongoose = require('mongoose')


var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    city: String,
    cuisineStyles: [String]
});

module.exports = mongoose.model('users', userSchema);