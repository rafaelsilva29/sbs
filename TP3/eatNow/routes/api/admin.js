var express = require('express');
var router = express.Router();

var Users = require('../../controllers/users')
var Restaurants = require('../../controllers/restaurants')
var cuisinestyles = require('../../controllers/cuisineStyles')

/* GET estilos de cozinha */
router.get('/cuisinestyles', function(req, res, next) {
  cuisinestyles.listar()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

/* GET restaurantes */
router.get('/restaurants', function(req, res, next) {
  Restaurants.listar()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

/* GET utilizadores */
router.get('/users', function(req, res, next) {
  Users.listar()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
