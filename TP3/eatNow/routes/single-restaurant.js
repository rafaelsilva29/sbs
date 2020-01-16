var express = require('express');
var router = express.Router();
var axios = require('axios')

var restaurant = ""
var reviews = ""
var restaurantName = ""

/* GET single restaurant page. */
router.get('/:idRestaurant', async function(req, res, next) {
  await axios.get('http://localhost:3012/api/restaurants/restaurant/'+req.params.idRestaurant)
    .then(dados => {
        restaurant = dados.data
        restaurantName = dados.data.Name
    })
    .catch(erro => {
       
  })

  await axios.get('http://localhost:3012/api/reviews?idRestaurant='+req.params.idRestaurant)
    .then(dados => {
        reviews = dados.data
    })
    .catch(erro => {
       
  })

  restaurantName = restaurantName.replace(/\s/g, '');

  res.render('single-restaurant', 
            { 
              title: 'EatNow', 
              restaurant: restaurant,
              restaurantName: restaurantName,
              reviews: reviews
            }
  );
});


module.exports = router;
