var express = require('express');
var router = express.Router();
var services = require('../services/user')
var axios = require('axios')

var cuisineStyles = ""
var restaurants = ""
var allRestaurantsCount = ""
var restaurantsMoreView = ""

/* GET home page. */
router.get('/', async function(req, res, next) {
  services.apagarUser()
  await axios.get('http://localhost:3012/api/cuisineStyles')
      .then(dados => {
        cuisineStyles = dados.data
    })
    .catch(erro => {
        
    })
  await axios.get('http://localhost:3012/api/restaurants?limit=10&system=false')
    .then(dados => {
        restaurants = dados.data
    })
    .catch(erro => {
       
    })
  
  await axios.get('http://localhost:3012/api/restaurants?limit=10&system=true')
    .then(dados => {
        restaurantsMoreView = dados.data
    })
    .catch(erro => {
       
    })

  await axios.get('http://localhost:3012/api/restaurants')
    .then(dados => {
      allRestaurantsCount = dados.data.length
    })
    .catch(erro => {
        
    })

    res.render('index', 
                    { 
                      title: 'EatNow', 
                      cuisineStyles: cuisineStyles,
                      city: "Iberian Peninsula",
                      restaurants: restaurants,
                      allRestaurantsCount: allRestaurantsCount,
                      restaurantsMoreView: restaurantsMoreView
                    }
    );
});

/* POST home page. */
router.post('/', async function(req, res, next) {
  var search = JSON.parse(JSON.stringify(req.body))
  var query = ""
  var city = ""
  var queryAux = ""
  if(search.city != 'none' && search.priceRange != 'none' && search.cuisineStyle != 'none') {
      if(search.city == "Porto") {
        city="/Oporto"
      } else {
        city = "/"+search.city
      }
      query = "?limit=10&system=false&priceRange="+search.priceRange+"&cuisineStyle="+search.cuisineStyle
      queryAux = "?limit=10&system=true&priceRange="+search.priceRange+"&cuisineStyle="+search.cuisineStyle
  } else if(search.city != 'none' && search.priceRange != 'none') {
      if(search.city == "Porto") {
        city="/Oporto"
      } else {
        city = "/"+search.city
      }
      query = "?limit=10&system=false&priceRange="+search.priceRange
      queryAux = "?limit=10&system=true&priceRange="+search.priceRange
  } else if(search.city != 'none' && search.cuisineStyle != 'none') {
      if(search.city == "Porto") {
        city="/Oporto"
      } else {
        city = "/"+search.city
      }
      query = "?limit=10&system=false&cuisineStyle="+search.cuisineStyle
      queryAux = "?limit=10&system=true&cuisineStyle="+search.cuisineStyle
  } else if(search.city != 'none') {
      if(search.city == "Porto") {
        city="/Oporto"
      } else {
        city = "/"+search.city
      }
      query = "?limit=10&system=false"
      queryAux = "?limit=10&system=true"
  } else if(search.priceRange != 'none' && search.cuisineStyle != 'none') {
      query = "?limit=10&system=false&priceRange="+search.priceRange+"cuisineStyle="+search.cuisineStyle
      queryAux = "?limit=10&system=true&priceRange="+search.priceRange+"cuisineStyle="+search.cuisineStyle
  } else if(search.priceRange != 'none') {
      query = "?limit=10&system=false&priceRange="+search.priceRange
      queryAux = "?limit=10&system=true&priceRange="+search.priceRange
  } else if(search.cuisineStyle != 'none') {
      query = "?limit=10&system=false&cuisineStyle="+search.cuisineStyle
      queryAux = "?limit=10&system=true&cuisineStyle="+search.cuisineStyle
  } else if(search.city != 'none') {
      if(search.city == "Porto") {
        city="/Oporto"
      } else {
        city = "/"+search.city
      }
      query = "?limit=10&system=false"
      queryAux = "?limit=10&system=true"
  } else {
      query = "?limit=10&system=false"
      queryAux = "?limit=10&system=true"
  }

  var cityTemp = ""
  if(city===""){
    cityTemp = "Iberian Peninsula"
  } else {
    cityTemp = city.replace("/","")
  }
  
  await axios.get('http://localhost:3012/api/restaurants'+city)
    .then(dados => {
      allRestaurantsCount = dados.data.length
    })
    .catch(erro => {
        
    })

  await axios.get('http://localhost:3012/api/restaurants'+city+query)
      .then(dados => {
        restaurants = dados.data
      })
      .catch(erro => {
          
      })
  
  await axios.get('http://localhost:3012/api/restaurants'+city+queryAux)
      .then(dados => {
        restaurantsMoreView = dados.data
      })
      .catch(erro => {
         
      })

      res.render('index', 
      { 
        title: 'EatFlix', 
        cuisineStyles: cuisineStyles,
        restaurants: restaurants,
        city: cityTemp,
        allRestaurantsCount: allRestaurantsCount,
        restaurantsMoreView: restaurantsMoreView
      });
});

module.exports = router;
