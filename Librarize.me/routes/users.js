var express = require('express');
var router = express.Router();
const models = require('../models');
const User = models.user;
const Property = models.property;
const Product = models.product;
const Friendship = models.friendship;
const Borrow = models.borrow;

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

// Get list of users
router.get('/', function (req, res) {
  User.findAll().then(function (users) {
    res.status(200).send(users)
  })
})

// Ask someone to be friend
router.post('/:id/invite', function (req, res, next) {
  if (req.params.id == req.body.userId) {
    res.status(422).send("Can't send an ivitation to yourself !");
  }
  Friendship.findAll({
    where : {
      $or: [
        {
          user1Id: req.params.id,
          user2Id: req.body.userId,
          state: {
            $ne: 'Refused'
          }
        }, {
          user2Id: req.params.id,
          user1Id: req.body.userId,
          state: {
            $ne: 'Refused'
          }
        }
      ]
    }
  }).then(function (friendship) {
    if (friendship.length != 0) {
      res.status(422).json({ error: "An invitation already exists" });
    }
  }).catch(function (error) {
    res.status(422).send(error);
  });
  User.find({
    where: {
      id: req.params.id
    }
  }).then(function (user1) {
    if (user1 != undefined) {
      User.find({
        where: {
          id: req.body.userId
        }
      }).then(function (user2) {
        if (user2 != undefined) {
          Friendship.create({
            user1Id: req.params.id,
            user2Id: req.body.userId,
            state: 'Waiting'
          }).then(function (friendship) {
            res.status(200).send(friendship);
          })
        } else {
          res.status(404).json({ error: "Unknown user" });
        }
      })
    } else {
      res.status(404).json({ error: "Unknown user" });
    }
  })
})

// Display all the waiting invitations
router.get('/:id/invites', function (req, res) {
  Friendship.findAll({
    where: {
      user2Id: req.params.id,
      state: 'Waiting'
    },
    include: [{ model: User, as: 'user1' }]
  }).then(function (users) {
    res.status(200).send(users);
  }).catch(function (error) {
    res.status(422).send(error);
  })
})

// Show all the borrows
router.get('/:userId/borrows', function (req, res) {
  Borrow.findAll({
    where: {
      toId: req.params.userId,
      state: 'Accepted'
    },
    include: [{ model: Property }]
  }).then(function (borrows) {
    res.status(200).send(borrows);
  })
})

router.get('/:userId/borrows_wait', function (req, res) {
  Borrow.findAll({
    where: {
      toId: req.params.userId,
      state: 'Waiting'
    },
    include: [{ model: Property }]
  }).then(function (borrows) {
    res.status(200).send(borrows);
  })
})

// // Display all friends of a user
// router.get('/:id/friends', function (req, res) {
//   Friendship.findAll({
//     where: {
//       user1Id: req.params.id
//     }
//   }).then(function (friendship) {
//     console.log(friendship);
//   })
//   // User.findById(req.params.id, {
//   //   include: [{
//   //     model: Friendship,
//   //     as: 'user1Id'
//     // }, {
//     //   model: Friendship,
//     //   as: 'user2'
//     }]
//   }).then(function (user) {
//     if (user != undefined) {
//       res.status(200).send(user)
//     } else {
//       res.status(404).json({ error: "Unknown user" })
//     }
//   })
// })

module.exports = router;
