var User = require('../models/users')

module.exports.listar = () => {
    return User
            .find()
            .exec()
}

module.exports.consultar = email => {
    return User
            .findOne( { email: email } )
            .exec()
}

module.exports.inserir = user => {
    var newUser = new User(user)
    return newUser.save()
}

module.exports.apagar = id => {
    return User
            .deleteOne({_id: id})
            .exec()
}
