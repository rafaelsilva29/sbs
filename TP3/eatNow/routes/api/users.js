var express = require('express');
var router = express.Router();

var Users = require('../../controllers/users')
var services = require('../../services/user')

var i=0;

/* GET users */
router.get('/', function(req, res, next) {
  Users.listar()
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

/* GET user by email */
router.get('/:email', function(req, res, next) {
  Users.consultar(req.params.email)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
});

router.post('/login', function(req, res, next) {
  let userPass = req.body.password
  Users.consultar(req.body.email)
          .then(function(dados){
            console.log("bb")
              services.registarUser(dados)
              if(dados.password===userPass){
                res.status(200).jsonp({message: "Com acesso"})
              } else {
                console.log("a")
                res.status(403).jsonp({message: "Sem acesso"})
              }
          })
          .catch(erro => res.status(500).jsonp(erro))
});

router.post('/registar', function(req, res, next) {
  let user = JSON.parse(JSON.stringify(req.body))
  Users.inserir(user)
          .then(function(dados){
            services.registarUser(dados)
            res.status(200).jsonp({message: "User registado com sucesso"})
          })
          .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
