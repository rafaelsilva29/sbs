var Recommendation = require('../models/recommendation')

module.exports.listar = () => {
    return Recommendation
            .find()
            .exec()
}

module.exports.listarPerUser = (idUser) => {
    return Recommendation
            .find({ idUser: idUser })
            .exec()
}