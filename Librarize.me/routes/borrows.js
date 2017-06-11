var express = require('express');
const models = require('../models');
const Property = models.property;
const Borrow = models.borrow;
var router = express.Router();

router.post('/', function (req, res) {
  Borrow.find({
    where: {
      propertyId: req.body.propertyId,
      until: {
        gte: new Date()
      },
      state: 'Accepted'
    }
  }).then(function (borrow) {
    if(borrow !== null) {
      res.status(422).send("Can't borrow a borrowed object");
      return
    } else {
      Property.find({
        where: {
          id: req.body.propertyId
        }
      }).then(function (property) {
        if(property === null) {
          res.status(422).send("Can't find property");
        } else if(property.dataValues.userId == req.body.userId) {
          res.status(422).send("Can't borrow to him self");
        } else {
          Borrow.create({
            toId: req.body.userId,
            until: req.body.until,
            state: 'Waiting',
            propertyId: req.body.propertyId,
          }).then(function (product) {
            res.status(201).send(product);
          }).catch(function (error) {
            res.status(422).send(error);
          })
        }
      })
    }
  })
});

module.exports = router;
