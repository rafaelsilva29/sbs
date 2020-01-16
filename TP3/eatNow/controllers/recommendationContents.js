var RecommendationContent = require('../models/recommendationContent')

module.exports.listar = () => {
    return RecommendationContent
            .find()
            .exec()
}

module.exports.listarPerUser = (idUser) => {
    return RecommendationContent
            .find({ idUser: idUser })
            .exec()
}