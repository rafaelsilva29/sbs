var CuisineStyle = require('../models/cuisineStyles')

module.exports.listar = () => {
    return CuisineStyle
            .find()
            .exec()
}