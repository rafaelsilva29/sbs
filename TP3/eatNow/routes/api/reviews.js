var express = require('express');
var router = express.Router();

var Reviews = require('../../controllers/reviews')
var Restaurants = require('../../controllers/restaurants')

/* GET Reviews */
router.get('/', function(req, res, next) {
  if(req.query.idUser && req.query.idRestaurant){
    Reviews.consultarRestaurantUser(req.query.idRestaurant,req.query.idUser)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  } else if(req.query.idUser){
    Reviews.consultarUser(req.query.idUser)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  } else if(req.query.idRestaurant) {
    Reviews.consultarRestaurant(req.query.idRestaurant)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  } else if(req.query.restaurantName) {
    Reviews.consultarRestaurantName(req.query.restaurantName)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  } else {
    Reviews.listar()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
  }
});

router.post('/', async function(req, res, next) {
  let review = JSON.parse(JSON.stringify(req.body))
  var countReviews = 0;
  var flag = false;
  await Restaurants.consultarRestaurant(review.idRestaurant)
                .then(function(dados){
                   if(dados.numberReviews == undefined){
                     countReviews = 1;
                   } else {
                     countReviews = dados.numberReviews + 1
                   }
                })
                .catch(erro => res.status(500).jsonp(erro))
  
  await Reviews.addReviewRestaurant(review.idRestaurant,countReviews)
          .then(function(dados){
              flag = true
          })
          .catch(erro => res.status(500).jsonp(erro))
  if(flag) {
    await Reviews.inserir(review)
            .then(function(dados){
              res.status(200).jsonp({message: "Review registada com sucesso"})
            })
            .catch(erro => res.status(500).jsonp(erro))
  }
});

module.exports = router;
