var RecommendationPerUser = require('../models/recommendationPerUser')

module.exports.listar = () => {
    return RecommendationPerUser
            .find()
            .exec()
}

module.exports.listarPerUser = (idUser) => {
    return RecommendationPerUser
            .find({ idUser: idUser })
            .exec()
}