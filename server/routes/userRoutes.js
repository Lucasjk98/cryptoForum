const express = require('express');
const router = express.Router();
const isAuthenticated = require('./middleware/isAuthenticated'); // Your custom authentication middleware


router.get('/profile', isAuthenticated, (req, res) => {
  res.render('profile', { user: req.user });
});


module.exports = router;