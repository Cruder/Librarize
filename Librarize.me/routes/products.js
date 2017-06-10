var express = require('express');
const models = require('../models');
const User = models.user;
const Product = models.product;
var router = express.Router();

router.get('/like', function(req, res) {
  if (req.query.name != '' || req.query.name != undefined) {
    Product.findAll({
      limit: req.query.limit || 25,
      offest: req.query.offest || 0,
      where: {
        name: {
          $like: '%' + req.query.name + '%'
        }
      }
    }).then(function (products, error) {
      res.status(200).send(products)
    })
  } else {
    res.status(200).send('[]');
  }
});


router.get('/', function (req, res) {
  res.status(200).send('ok')
})

module.exports = router;
