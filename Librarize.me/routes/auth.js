var express = require('express');
var passport = require('passport')
const models = require('../models');
const User = models.user;
var router = express.Router();

// Sign in as a user
router.post('/login', passport.authenticate('local'), function(req, res) {
  User.find({
    where: {
      email: req.body.email
    }
  }).then(function(user) {
    res.status(200).send(user);
  }).catch(function(error) {
    res.status(422).send(error);
  });
});

// Sign out
router.get('/logout', function(req, res){
  req.logout();
});

// Sign up as a user
router.post('/register', function(req, res, next) {
  if (req.body.password == req.body.password_confirmation) {
    User.create({
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      nickname: req.body.nickname,
      phone: req.body.phone,
      lastname: req.body.lastname
    }).then(function() {
      res.status(200).redirect('/')
    }).catch(function(error) {
      res.status(422).send(error);
    });
  } else {
    res.status(422).send('Password and password confirmation are different');
  }
});

module.exports = router;
