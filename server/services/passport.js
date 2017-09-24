const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const mongoose = require('mongoose');

const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(new FacebookStrategy(
  {
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',
    proxy: true,
    profileFields: ['emails', 'first_name', 'picture.type(large)'],
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ facebookId: profile.id });

    if(existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({ facebookId: profile.id, email: profile.emails[0].value, firstName: profile.name.givenName, profilePhoto: profile.photos[0].value }).save();
    done(null, user)
  })
);