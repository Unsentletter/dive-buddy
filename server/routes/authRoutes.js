const passport = require('passport');
const requireLogin = require('../middleware/requireLogin');

module.exports = (app) => {
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile']
  }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook'),
    function(req, res) {
      res.redirect('/profile')
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  });

  app.get('/api/current_user', requireLogin, (req, res) => {
    res.send(req.user);
  });
};