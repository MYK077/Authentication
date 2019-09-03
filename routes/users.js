const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')
var validator = require("email-validator");
// user Model
const User = require('../models/users');

router.get('/register', (req, res) => {
  res.render('register')
});

router.get('/login', (req, res) => {
  res.render('login')
});

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;

  var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (!validator.validate("email")){
    errors.push({msg: 'email is not valid'})
  }

  if (!regularExpression.test(password)) {
    errors.push({ msg: 'password should contain atleast one number and one special character' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash('success_msg','You are now registered and can log in');
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/users/login',
  failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout',(req,res)=>{
  req.logout();
  req.flash('success_msg','you are logged out');
  res.redirect('/users/login');
})


module.exports = router;
