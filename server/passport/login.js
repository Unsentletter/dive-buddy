const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user');
var bCrypt = require(bcrypt-node.js);

module.exports = function (passport) {
  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User.findOne({ 'username': username},
      function(err, user) {
        if (err){
          return done(err);
        }
        if (!user) {
          console.log(`User not found with username ${username}`);
          return done(null, false, req.flash('message', 'User not found'));
        }
        if(!isValidPassword(user, password)) {
          console.log('invalid password');
          return done (null, false, req.flash('message', 'Invalid Password'))
        }
        return done(null, user);
      }
    );
  }));

  let isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  }
}
