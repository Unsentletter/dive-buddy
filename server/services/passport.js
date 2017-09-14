const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const mongoose = require('mongoose');

const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});

passport.use(new FacebookStrategy(
  {
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('access', accessToken);
    console.log('profile', profile);
    User.findOne({ facebookId: profile.id })
      .then((existingUser) => {
        if(existingUser) {
          console.log('existing', existingUser);
          done(null, existingUser);
        } else {
          new User({ facebookId: profile.id })
            .save()
            .then(user => { done(null, user) })
        }
      });
  })
);