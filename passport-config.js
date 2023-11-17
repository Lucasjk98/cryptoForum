const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./server/models/models').User
const passport = require("passport")



// function initialize(passport) {
//   const authenticateUser = async (email, password, done) => {
//     try {
//       const user = await User.findOne({ email });

//       if (!user) {
//         return done(null, false, { message: 'No user with that email' });
//       }

//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: 'Password incorrect' });
//       }
//     } catch (error) {
//       return done(error);
//     }
//   };

passport.use(new LocalStrategy(
  function (email, password, done) {

    User.findByEmail(email, (err, user) => {
      if(err) return done(err);

      if(!user) return done(null, false);

      if(user.password != password) return done(null, false);

      return done(null, user)
    });
  })
);

  passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    if (err) return done(err); 
    done(null, user);
  });
});


module.exports = initialize;