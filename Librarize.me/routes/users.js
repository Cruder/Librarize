var express = require('express');
var router = express.Router();
const models = require('../models');
const User = models.user;
const Property = models.property;
const Product = models.product;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/:id', function (req, res) {

});

router.put('/:id/reset_password', function (req, res) {

});

router.get('/:id/products', function(req, res, next) {
  Property.findAll({
    where: {
      userId: req.params.id
    },
    include: [{ model: Product }]
  }).then(function (properties) {
    if(properties != null) {
      res.status(200).send(properties);
    }
  }).catch(function (error) {
    res.status(422).send(error);
  });
});

router.delete('/:userId/properties/:id', function(req, res, next) {
  Property.find({
    where: {
      userId: req.params.userId,
      id: req.params.id
    }
  }).then(function (property) {
    if(property != null) {
      property.destroy().then(function(property) {
        res.status(204)
      }).catch(function(error) {
        res.status(422).send(error);
      })
    }
  }).catch(function (error) {
    res.status(422).send(error);
  });
});

module.exports = router;
