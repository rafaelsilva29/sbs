var express = require('express');
var router = express.Router();

var Recommendation = require('../../controllers/recommendations')
var Restaurants = require('../../controllers/restaurants')

router.get('/', function(req, res, next) {
  Recommendation.listar()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.get('/:idUser',  async function(req, res, next) {
  let aux= [];
  await Recommendation.listarPerUser(req.params.idUser)
          .then(dados => aux = dados)
          .catch(erro => res.status(500).jsonp(erro))
  let data = []
  for(var i=0; i<aux.length; i++) {
    await Restaurants.consultarRestaurant(aux[i].idRestaurant)
      .then(dados => data.push(dados))
      .catch(erro => console.log(erro.message))
  }
  res.jsonp(data)
});

module.exports = router;
