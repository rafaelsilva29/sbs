var express = require('express');
var router = express.Router();
var axios = require('axios')

var restaurants = ""
var cuisineStyles = ""

/* GET restaurants */
router.get('/', async function(req, res, next) {
  await axios.get('http://localhost:3012/api/cuisineStyles')
      .then(dados => {
        cuisineStyles = dados.data
    })
    .catch(erro => {
        res.render('error', {
          message: erro.message,
          error: erro
         })
  })
  await axios.get('http://localhost:3012/api/restaurants?limit=45&system=false')
    .then(dados => {
        restaurants = dados.data
    })
    .catch(erro => {
        res.render('error', {
                      message: erro.message,
                      error: erro
                    })
  })

  res.render('explore', 
            { 
              title: 'EatNow', 
              cityExplore: req.query.city,
              cuisineStyles: cuisineStyles,
              restaurants: restaurants,
            }
  );
});

router.post('/', async function(req, res, next) {
  var query = ""
  var city = ""
  var cuisineStyles;

  if(req.body.city != 'none' && req.body.cuisineStyle != 'none') {
      if(req.body.city == 'Porto') {
          city = "/Oporto"
      } else {
          city = "/" + req.body.city
      }
      query = "?limit=45&system=false&cuisineStyle="+req.body.cuisineStyle
  } else if(req.body.city != 'none') {
    if(req.body.city == 'Porto') {
      city = "/Oporto"
    } else {
        city = "/" + req.body.city
    }
    query = "?limit=45&system=false"
  } else if(req.body.cuisineStyle != 'none') {
    query = "?limit=45&system=false&cuisineStyle="+req.body.cuisineStyle
  } else {
    city = ""
    query = "?limit=45&system=false"
  }

  var cityTemp = ""
  if(city===""){
    cityTemp = "Iberian Peninsula"
  } else {
    cityTemp = city.replace("/","")
  }

  await axios.get('http://localhost:3012/api/cuisineStyles')
      .then(dados => {
        cuisineStyles = dados.data
    })
    .catch(erro => {
        res.render('error', {
          message: erro.message,
          error: erro
         })
  })

  await axios.get('http://localhost:3012/api/restaurants'+city+query)
      .then(dados => {
          res.render('explore', 
                  { 
                    title: 'EatNow', 
                    cityExplore: cityTemp,
                    cuisineStyles: cuisineStyles,
                    restaurants: dados.data,
                  }
          );
      })
      .catch(erro => {
          res.render('error', {
                              message: erro.message,
                              error: erro
                              })
      })
})


module.exports = router;
