var express = require('express');
var router = express.Router();
var axios = require('axios')
var service = require('../services/user')

router.get('/', async function(req, res, next) {
  var cuisineStyles = ""
  var allRestaurantsCount = ""
  var restaurantsContent = ""
  var restaurantsPerUser = ""
  var restaurantsMoreView = ""
  var restaurantsSpecial = ""

  await axios.get('http://localhost:3012/api/cuisineStyles')
      .then(dados => {
          cuisineStyles = dados.data
      })
      .catch(erro => {
        
    })

  await axios.get('http://localhost:3012/api/restaurants')
        .then(dados => {
              allRestaurantsCount = dados.data.length
        })
        .catch(erro => {
         
    })

  await axios.get('http://localhost:3012/api/restaurants?limit=10&system=true')
        .then(dados => {
              restaurantsMoreView = dados.data
        })
        .catch(erro => {
         
    })

  await axios.get('http://localhost:3012/api/recommendations/' +  service.idUser)
      .then(dados => {
            restaurantsSpecial = dados.data
      })
      .catch(erro => {
          
    })

  await axios.get('http://localhost:3012/api/recommendationContents/' +  service.idUser)
        .then(dados => {
              restaurantsContent = dados.data
        })
        .catch(erro => {
           
      })

  await axios.get('http://localhost:3012/api/recommendationPerUsers/' +  service.idUser)
      .then(dados => {
            restaurantsPerUser = dados.data
      })
      .catch(erro => {
          
    })

    // -----
    var recommendation = Object.values(restaurantsContent.concat(restaurantsPerUser).reduce((r,o) => {
                            r[o._id] = o;
                            return r;
                          },{}));
    
    recommendation.sort(function (a, b) {
      if (a.Rating < b.Rating) {
        return 1;
      }
      if (a.Rating > b.Rating) {
        return -1;
      }
      return 0;
    });
    // ----

    restaurantsSpecial.sort(function (a, b) {
      if (a.Rating < b.Rating) {
        return 1;
      }
      if (a.Rating > b.Rating) {
        return -1;
      }
        return 0;
      });

    res.render('indexAuth', 
                    { 
                      title: 'EatNow', 
                      cuisineStyles: cuisineStyles,
                      city: "Iberian Peninsula",
                      allRestaurantsCount: allRestaurantsCount,
                      restaurantsMoreView: restaurantsMoreView,
                      recommendation: recommendation.slice(0,10),
                      restaurantsSpecial: restaurantsSpecial.slice(0,10)
                    }
    );
});

/* POST home page. */
router.post('/', async function(req, res, next) {
  var search = JSON.parse(JSON.stringify(req.body))
  var query = ""
  var city = ""
  var cuisineStyles = ""
  var allRestaurantsCount = ""
  var queryAux = ""
  var restaurantsMoreView = ""
  var restaurantsSpecial = ""

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

  await axios.get('http://localhost:3012/api/recommendations/' +  service.idUser)
    .then(dados => {
          restaurantsSpecial = dados.data
    })
    .catch(erro => {
        
  })
  
  await axios.get('http://localhost:3012/api/restaurants' + city)
    .then(dados => {
        allRestaurantsCount = dados.data.length
    })
    .catch(erro => {
       
    })

  await axios.get('http://localhost:3012/api/restaurants' + city + queryAux)
        .then(dados => {
            restaurantsMoreView = dados.data
        })
        .catch(erro => {
          
    })


  await axios.get('http://localhost:3012/api/recommendationContents/' +  service.idUser)
      .then(dados => {
            restaurantsContent = dados.data
      })
      .catch(erro => {
        
    })

  await axios.get('http://localhost:3012/api/recommendationPerUsers/' +  service.idUser)
    .then(dados => {
          restaurantsPerUser = dados.data
    })
    .catch(erro => {
      
  })

  var recommendation = Object.values(restaurantsContent.concat(restaurantsPerUser).reduce((r,o) => {
                          r[o._id] = o;
                          return r;
                        },{}));
  
  recommendation.sort(function (a, b) {
    if (a.Rating < b.Rating) {
      return 1;
    }
    if (a.Rating > b.Rating) {
      return -1;
    }
    return 0;
  });

  restaurantsSpecial.sort(function (a, b) {
    if (a.Rating < b.Rating) {
      return 1;
    }
    if (a.Rating > b.Rating) {
      return -1;
    }
      return 0;
    });

    res.render('indexAuth', 
          { 
            title: 'EatFlix', 
            cuisineStyles: cuisineStyles,
            city: cityTemp,
            allRestaurantsCount: allRestaurantsCount,
            restaurantsMoreView: restaurantsMoreView,
            recommendation: recommendation.slice(0,10),
            restaurantsSpecial: restaurantsSpecial.slice(0,10)
          }
);
});

router.get('/registerLogin', async function(req, res, next) {
    await axios.get('http://localhost:3012/api/cuisineStyles')
      .then(dados => {
        res.render('register-login', 
            { 
              title: 'EatNow', 
              cuisineStyles: dados.data
            }
        );
    })
    .catch(erro => {
       
    })
});

router.post('/registar', async function(req, res, next){
  if(req.body.name != '' && req.body.city != '' && req.body.email != '' && req.body.pass != '' && req.body.re_pass != '') {
    if(req.body.pass == req.body.re_pass) {
      axios.post('http://localhost:3012/api/users/registar', 
          {
            name: req.body.name,
            city: req.body.city,
            email: req.body.email,
            password: req.body.pass,
            cuisineStyles: req.body.cuisineStyle
          })
        .then(dados => {
            res.redirect("/users")
        })
        .catch(erro => {
            res.redirect('registerLogin')
        });
    }
  }
})

router.post('/login', async function(req, res, next){
  if(req.body.email != '' && req.body.password != '') {
    axios.post('http://localhost:3012/api/users/login', 
          {
            email: req.body.email,
            password: req.body.password,
          })
        .then(dados => {
            res.redirect("/users")
        })
        .catch(erro => {
            res.redirect('registerLogin')
        });
  }
})

/* GET contacts */
router.get('/contact', async function(req, res, next) {
  res.render('contactAuth', 
            { 
              title: 'EatNow', 
            }
  );
});

router.get('/news', async function(req, res, next) {
  res.render('newsAuth', 
            { 
              title: 'EatNow', 
            }
  );
});

var restaurants = ""
var cuisineStyles = ""

router.get('/explore', async function(req, res, next) {
  
  await axios.get('http://localhost:3012/api/cuisineStyles')
      .then(dados => {
        cuisineStyles = dados.data
    })
    .catch(erro => {
        
  })
  
  await axios.get('http://localhost:3012/api/restaurants?limit=45&system=false')
    .then(dados => {
        restaurants = dados.data
    })
    .catch(erro => {
     
  })

  res.render('exploreAuth', 
            { 
              title: 'EatNow', 
              cityExplore: req.query.city,
              cuisineStyles: cuisineStyles,
              restaurants: restaurants,
            }
  );
});


router.post('/explore', async function(req, res, next) {
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
       
  })

  await axios.get('http://localhost:3012/api/restaurants'+city+query)
      .then(dados => {
          res.render('exploreAuth', 
                  { 
                    title: 'EatNow', 
                    cityExplore: cityTemp,
                    cuisineStyles: cuisineStyles,
                    restaurants: dados.data,
                  }
          );
      })
      .catch(erro => {
          
      })
})

/* GET single restaurant page. */
router.get('/restaurant/:idRestaurant', async function(req, res, next) {
  var restaurant = ""
  var reviews = ""
  var restaurantName = ""
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
        res.render('error', {
                              message: erro.message,
                              error: erro
                            })
  })

  restaurantName = restaurantName.replace(/\s/g, '');

  res.render('single-restaurantAuth', 
            { 
              title: 'EatNow', 
              restaurant: restaurant,
              restaurantName: restaurantName,
              reviews: reviews
            }
  );
});

router.get('/reviews', async function(req, res, next) {
  res.render('review', 
            { 
              title: 'EatNow', 
              idRestaurant: req.query.idRestaurant,
              city: req.query.city,
              name: req.query.name
            }
  );
})

router.post('/reviews', async function(req, res, next) {
  if(req.body.rating != '' && req.body.date != '' && req.body.comment != '' && req.body.shortComment != '') {
    if(req.body.rating=='1' || req.body.rating=='2' || req.body.rating=='3' || req.body.rating=='4' || req.body.rating=='5' || req.body.rating=='0') {
      axios.post('http://localhost:3012/api/reviews', 
            {
              idUser: service.idUser,
              idRestaurant: req.query.idRestaurant,
              NameRestaurant: req.query.name,
              Rating:req.body.rating,
              Date: req.body.date,
              NameUser: service.name,
              ShortComment: req.body.shortComment,
              Comment: req.body.comment
            })
          .then(dados => {
              res.redirect("/users/restaurant/"+req.query.idRestaurant)
          })
          .catch(erro => {
              
          });
    }
  }
})

module.exports = router;
