var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', async function(req, res, next) {
  res.render('news', 
            { 
              title: 'EatNow', 
            }
  );
});

module.exports = router;
