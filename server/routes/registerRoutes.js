const express = require('express');
const router = express.Router();

app.post('/register', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/register',
  failureFlash: true
}));

app.get('/profile', isAuthenticated, (req, res) => {
  res.send(`Welcome, ${req.user.username}!`);
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}