const express = require('express');
const router = express.Router();
const passport = require('passport');


router.post('/register', (req, res) => {
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/user/profile',
  failureRedirect: '/login',
  failureFlash: true
}));


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;