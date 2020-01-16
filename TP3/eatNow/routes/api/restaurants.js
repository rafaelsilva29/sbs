var express = require('express');
var router = express.Router();

var Restaurants = require('../../controllers/restaurants')

/* GET restaurantes  */
router.get('/', function(req, res, next) {
  if(req.query.limit && req.query.system && req.query.cuisineStyle && req.query.priceRange) {
    if(req.query.system=='true') {
      // Recomendar o sistema e estilo de cozinha e preço
      Restaurants.consultarSystemCuisineStylePriceRange(parseInt(req.query.limit), req.query.cuisineStyle, req.query.priceRange)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
    } else {
      // Recomendar por ranking e estilo de cozinha e preço
      Restaurants.consultarCuisineStylePriceRange(parseInt(req.query.limit), req.query.cuisineStyle, req.query.priceRange)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
    }
  } else if(req.query.limit && req.query.system && req.query.cuisineStyle) {
      if(req.query.system=='true') {
        // Recomendar o sistema e estilo de cozinha
        Restaurants.consultarSystemCuisineStyle(parseInt(req.query.limit), req.query.cuisineStyle)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
      } else {
        // Recomendar por ranking e estilo de cozinha
        Restaurants.consultarCuisineStyle(parseInt(req.query.limit), req.query.cuisineStyle)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
      }
  } else if(req.query.limit && req.query.system && req.query.priceRange) {
      if(req.query.system=='true') {
        // Recomendar o sistema e preço
        Restaurants.consultarSystemPriceRange(parseInt(req.query.limit), req.query.priceRange)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
      } else {
        // Recomendar por ranking e preço
        Restaurants.consultarPriceRange(parseInt(req.query.limit), req.query.priceRange)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
      }
  } else if(req.query.limit && req.query.system) {
        if(req.query.system=='true') {
          // Recomendar o sistema
          Restaurants.consultarSystem(parseInt(req.query.limit))
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro)) 
        } else {
          // Recomendar por ranking
          Restaurants.consultarRanking(parseInt(req.query.limit))
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro)) 
        }
  } else {
    // Mostrar todos os restaurantes do sistema
    Restaurants.listar()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  }
});

/* GET restaurantes por cidade  */
router.get('/:city', function(req, res) {
  if(req.query.limit && req.query.system && req.query.cuisineStyle && req.query.priceRange) {
    if(req.query.system=='true') {
      // Recomendar o sistema e estilo de cozinha e preço e numa determinada cidade
      Restaurants.consultarCitySystemCuisineStylePriceRange(req.params.city,parseInt(req.query.limit), req.query.cuisineStyle, req.query.priceRange)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
    } else {
      // Recomendar por ranking e estilo de cozinha e preço e numa determinada cidade
      Restaurants.consultarCityCuisineStylePriceRange(req.params.city,parseInt(req.query.limit), req.query.cuisineStyle, req.query.priceRange)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
    }
  } else if(req.query.limit && req.query.system && req.query.cuisineStyle) {
      if(req.query.system=='true') {
        // Recomendar o sistema e estilo de cozinha e numa determinada cidade
        Restaurants.consultarCitySystemCuisineStyle(req.params.city,parseInt(req.query.limit), req.query.cuisineStyle)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
      } else {
        // Recomendar por ranking e estilo de cozinha e numa determinada cidade
        Restaurants.consultarCityCuisineStyle(req.params.city,parseInt(req.query.limit), req.query.cuisineStyle)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
      }
  } else if(req.query.limit && req.query.system && req.query.priceRange) {
      if(req.query.system=='true') {
        // Recomendar o sistema e preço e numa determinada cidade
        Restaurants.consultarCitySystemPriceRange(req.params.city,parseInt(req.query.limit), req.query.priceRange)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
      } else {
        // Recomendar por ranking e preço e numa determinada cidade
        Restaurants.consultarCityPriceRange(req.params.city,parseInt(req.query.limit), req.query.priceRange)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
      }
  } else if(req.query.limit && req.query.system) {
        if(req.query.system=='true') {
          // Recomendar o sistema e numa determinada cidade
          Restaurants.consultarCitySystem(req.params.city,parseInt(req.query.limit))
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro)) 
        } else {
          // Recomendar por ranking e numa determinada cidade
          Restaurants.consultarCityRanking(req.params.city,parseInt(req.query.limit))
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro)) 
        }
  } else {
      // Mostrar todos os restaurantes do sistema e numa determinada cidade
      Restaurants.consultarCity(req.params.city)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
  }
});

router.get('/restaurant/:idRestaurant', function(req, res) {
     // Mostrar um restaurant
     Restaurants.consultarRestaurant(req.params.idRestaurant)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;
