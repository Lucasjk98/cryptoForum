const express = require('express');
const router = express.Router();
const passport = require('../middleware/authentication');
const User = require('../models/models').User;
const bcrypt = require('bcrypt');


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ user: user });
      console.log(req.user);
    });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log('user registered');
    res.status(200).json({ message: 'Registration Successful' });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});

router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send({
      user,
    });
  } else {
    res.redirect('/login');
    res.status(401).json({ error: 'Unauthorized' });
  }
});

 router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});

module.exports = router;
