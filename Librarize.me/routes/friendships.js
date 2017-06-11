var express = require('express');
var router = express.Router();
const models = require('../models');
const User = models.user;
const Friendship = models.friendship;


// Accept a invitation to be friends
router.put('/invites/:id/accept', function (req, res) {
  Friendship.update({
    state: 'Accepted'
  }, {
    where: {
      id: req.params.id
    }
  }).then(function (friendship) {
    if (friendship != undefined) {
      res.status(200).send(friendship);
    } else {
      res.status(404).json({ error: "Friendship not found" });
    }
  })
})

// Refuse a invitation to be friends
router.put('/invites/:id/accept', function (req, res) {
  Friendship.update({
    state: 'Refused'
  }, {
    where: {
      id: req.params.id
    }
  }).then(function (friendship) {
    if (friendship != undefined) {
      res.status(200).send(friendship);
    } else {
      res.status(404).json({ error: "Friendship not found" });
    }
  })
})

module.exports = router;
