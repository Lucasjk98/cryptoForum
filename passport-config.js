const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./server/models/models').User



function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }

      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false, { message: 'User not found' });
      }
    })
    .catch(err => {
      done(err);
    });
});
}

module.exports = initialize;