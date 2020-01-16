var express = require('express');
var router = express.Router();

var cuisinestyles = require('../../controllers/cuisineStyles')

/* GET estilos de cozinha */
router.get('/', function(req, res, next) {
  cuisinestyles.listar()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
