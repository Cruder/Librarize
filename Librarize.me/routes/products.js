var express = require('express');
const models = require('../models');
const User = models.user;
const Product = models.product;
const Property = models.property;
var router = express.Router();

router.post('/', function (req, res) {
  Product.create({
    category: req.body.category,
    name: req.body.name,
    picture: req.body.picture
  }).then(function (product) {
    res.status(201).send(product);
  }).catch(function (error) {
    res.status(422).send(error);
  })
});

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
    }).then(function (products) {
      res.status(200).send(products);
    })
  } else {
    res.status(200).send('[]');
  }
});

router.post('/:id/librarize', function (req, res) {
  User.find({
    where: {
      id: req.body.userId
    }
  }).then(function (user) {
    Product.find({
      where: {
        id: req.params.id
      }
    }).then(function (product) {
      if (user != null && product != null) {
        Property.create({
          userId: req.body.userId,
          productId: req.params.id
        });
        res.status(200);
      } else {
        res.status(404).send('Resources not found');
      }
    }).catch(function (error) {
      res.status(404).send(error);
    });
  }).catch(function (error) {
    res.status(404).send(error);
  });
});

module.exports = router;
