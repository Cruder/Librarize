var express = require('express');
var router = express.Router();
const models = require('../models');
const User = models.user;
const Property = models.property;
const Product = models.product;
const Friendship = models.friendship;

// Update the data of a user
router.put('/:id', function (req, res) {

});

// Change the password of a user
router.put('/:id/reset_password', function (req, res) {

});

// Get all the elements of a library of a user
router.get('/:id/products', function(req, res) {
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

// Delete an element from the library of a user
router.delete('/:userId/properties/:id', function(req, res) {
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

router.get('/', function (req, res) {
  User.findAll().then(function (users) {
    res.status(200).send(users)
  })
})

router.post('/:id/invit', function (req, res) {
  if (req.params.id == req.body.userId) {
    res.status(422).send("Can't send an ivitation to yourself !")
  }
  console.log(req.params.id);
  console.log(req.body.userId);
  Friendship.find({
    $or: [
      {
        where: {
          user1Id: req.params.id,
          user2Id: req.body.userId
        }
      }, {
        where: {
          user2Id: req.params.id,
          user1Id: req.body.userId
        }
      }
    ]
  }).then(function (friendship) {
    if (friendship != undefined) {
      res.status(422).json({ error: "An invitation already exists" })
    }
  }).catch(function (error) {
    res.status(422).send(error)
  });
  User.find({
    where: {
      id: req.params.id
    }
  }).then(function (user1) {
    console.log(user1);
    if (user1 != undefined) {
      User.find({
        where: {
          id: req.body.userId
        }
      }).then(function (user2) {
        console.log(user2);
        if (user2 != undefined) {
          Friendship.create({
            user1Id: req.params.id,
            user2Id: req.body.userId
          }).then(function (friendship) {
            res.status(200).send(friendship)
          })
        } else {
          res.status(404).json({ error: "Unknown user" })
        }
      })
    } else {
      res.status(404).json({ error: "Unknown user" })
    }
  })
})

module.exports = router;
