var express = require('express');
var router = express.Router();
var axios = require('axios')


/* GET restaurants */
router.get('/', async function(req, res, next) {
  res.render('contact', 
            { 
              title: 'EatNow', 
            }
  );
});


module.exports = router;
