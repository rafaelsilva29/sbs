var Restaurant = require('../models/restaurants')

// *********************************************************** EndPoint -> /restaurant *********************************************************** //
module.exports.consultarRestaurant = id => {
    return Restaurant
            .findOne({ _id: id })
            .exec()       
}

// *********************************************************** EndPoint -> / *********************************************************** //

/////// /////// ///////
/////// System  ///////
/////// /////// ///////
// ---------------------------------------------------------------------- //
module.exports.listar = () => {
    return Restaurant
            .find()
            .sort( { Rating: -1 } )
            .exec()
            
}

// ---------------------------------------------------------------------- //
module.exports.consultarSystemCuisineStylePriceRange = (limit,cuisineStyle,priceRange) => {
    return Restaurant
            .find({ $and: [ {priceRange: priceRange}, {cuisineStyles: cuisineStyle} ] })
            .limit(limit)
            .sort( { numberReviews: -1 } )
            .exec()
}

// ---------------------------------------------------------------------- //
module.exports.consultarSystemCuisineStyle = (limit,cuisineStyle) => {
    return Restaurant
            .find({ cuisineStyles: cuisineStyle })
            .limit(limit)
            .sort( { numberReviews: -1 } )
            .exec()
}

// ---------------------------------------------------------------------- //
module.exports.consultarSystemPriceRange = (limit,priceRange) => {
    return Restaurant
            .find({ priceRange: priceRange })
            .limit(limit)
            .sort( { numberReviews: -1 } )
            .exec()
}

// ---------------------------- TOP 10 VISTOS ------------------------------------------ //
module.exports.consultarSystem= (limit) => {
    return Restaurant
            .find()
            .limit(limit)
            .sort( { numberReviews: -1 } )
            .exec()
}

/////// /////// ///////
/////// Ranking ///////
/////// /////// ///////
// ---------------------------------------------------------------------- //
module.exports.consultarCuisineStylePriceRange = (limit,cuisineStyle,priceRange) => {
    return Restaurant
            .find({ $and: [ {priceRange: priceRange}, {cuisineStyles: cuisineStyle} ] })
            .limit(limit)
            .sort( { Rating: -1 } )
            .exec()
}

// ---------------------------------------------------------------------- //
module.exports.consultarCuisineStyle = (limit,cuisineStyle) => {
    return Restaurant
            .find( {cuisineStyles: cuisineStyle} )
            .limit(limit)
            .sort( { Rating: -1 } )
            .exec()
}

// ---------------------------------------------------------------------- //
module.exports.consultarPriceRange = (limit,priceRange) => {
    return Restaurant
            .find({ priceRange: priceRange })
            .limit(limit)
            .sort( { Rating: -1 } )
            .exec()
}

// ---------------------------------------------------------------------- //
module.exports.consultarRanking = (limit) => {
    return Restaurant
            .find()
            .limit(limit)
            .sort( { Rating: -1 } )
            .exec()
}
// ********************************************************************************************************************** //



// ************************************************************* EndPoint -> /restaurants *************************************** //

/////// /////// ///////
/////// System  ///////
/////// /////// ///////
// ---------------------------------------------------------------------- //
module.exports.consultarCity = city => {
    return Restaurant
            .find({ City: city })
            .exec()
}

// ---------------------------------------------------------------------- //
module.exports.consultarCitySystemCuisineStylePriceRange = (city,limit,cuisineStyle,priceRange) => {
    return Restaurant
            .find({ $and: [ {City: city}, {priceRange: priceRange}, {cuisineStyles: cuisineStyle} ] })
            .limit(limit)
            .sort( { numberReviews: -1 } )
            .exec()
}

// ---------------------------------------------------------------------- //
module.exports.consultarCitySystemCuisineStyle = (city,limit,cuisineStyle) => {
    return Restaurant
            .find({ $and: [ {City: city}, {cuisineStyles: cuisineStyle} ]})
            .limit(limit)
            .sort( { numberReviews: -1 } )
            .exec()
}

// ---------------------------------------------------------------------- //
module.exports.consultarCitySystemPriceRange = (city,limit,priceRange) => {
    return Restaurant
            .find({ $and: [ {City: city}, {priceRange: priceRange} ] })
            .limit(limit)
            .sort( { numberReviews: -1 } )
            .exec()
}

// ---------------------------------------------------------------------- //
module.exports.consultarCitySystem= (city,limit) => {
    return Restaurant
            .find({ City: city })
            .limit(limit)
            .sort( { numberReviews: -1 } )
            .exec()
}

/////// /////// ///////
/////// Ranking ///////
/////// /////// ///////
// ---------------------------------------------------------------------- //
module.exports.consultarCityCuisineStylePriceRange = (city,limit,cuisineStyle,priceRange) => {
    return Restaurant
            .find({ $and: [ {City: city}, {priceRange: priceRange}, {cuisineStyles: cuisineStyle} ] })
            .limit(limit)
            .sort( { Rating: -1 } )
            .exec()
}

// ---------------------------------------------------------------------- //
module.exports.consultarCityCuisineStyle = (city,limit,cuisineStyle) => {
    return Restaurant
            .find( {$and: [ {City: city}, {cuisineStyles: cuisineStyle} ]} )
            .limit(limit)
            .sort( { Rating: -1 } )
            .exec()
}

// ---------------------------------------------------------------------- //
module.exports.consultarCityPriceRange = (city,limit,priceRange) => {
    return Restaurant
            .find({$and: [ {City: city}, {priceRange: priceRange} ]})
            .limit(limit)
            .sort( { Rating: -1 } )
            .exec()
}

// ---------------------------------------------------------------------- //
module.exports.consultarCityRanking = (city,limit) => {
    return Restaurant
            .find({City: city})
            .limit(limit)
            .sort( { Rating: -1 } )
            .exec()
}
