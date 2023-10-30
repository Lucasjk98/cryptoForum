const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt')
const User = require('../models/models').User


console.log('runnin')
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/auth')
  }
  next()
}



router.post('/register', checkNotAuthenticated, async (req, res) =>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            email:req.body.email,
            password:hashedPassword,
        })
        await newUser.save();
        res.redirect('/auth/login')
    } catch {
      res.redirect('/auth/register')
    }
  })

  router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.get('/profile', checkAuthenticated, (req, res) => {
  res.send(`Welcome, ${req.user.username}!`);
});

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})


router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/auth',
    failureRedirect: '/login',
    failureFlash:true
}))


router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      // Handle the error, if any
      console.error(err);
    }
    res.redirect('/auth/login');
  });
});

router.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name})
})

module.exports = router;
