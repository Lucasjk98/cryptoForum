const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models/models');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findOne({ _id: id });
    cb(null, user);
  } catch (error) {
    cb(error, null);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'No user with that email' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
          return done(null, user);
        }
        return done(null, false, { message: 'Password incorrect' });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

module.exports = passport;
