var Review = require('../models/reviews')
var Restaurant = require('../models/restaurants')

module.exports.listar = () => {
    return Review
            .find()
            .exec()
}

module.exports.consultarUser = idUser => {
    return Review
            .find( { idUser: idUser } )
            .exec()
}

module.exports.consultarRestaurant = idRestaurant => {
    return Review
            .find( { idRestaurant: idRestaurant } )
            .exec()
}

module.exports.consultarRestaurantUser = (idRestaurant,idUser) => {
    return Review
            .find( { idRestaurant: idRestaurant, idUser: idUser } )
            .exec()
}

module.exports.consultarRestaurantName = NameRestaurant => {
    return Review
            .find( { NameRestaurant: NameRestaurant } )
            .exec()
}

module.exports.inserir = review => {
    var newReview = new Review(review)
    return newReview.save()
}

module.exports.addReviewRestaurant = (id,num) => {
     return Restaurant.
            update({_id: id}, {
                                numberReviews: num
                            })
            .exec()
}

module.exports.apagar = id => {
    return Review
            .deleteOne({_id: id})
            .exec()
}