const requireLogin = require('../middleware/requireLogin');

module.exports = (app) => {
  app.post('/api/current_location', async (req, res) => {

    req.user.longitude = req.body.longitude;
    req.user.latitude = req.body.latitude;
    const user = await req.user.save();

    res.send(user);
  });

  app.get('/api/nearby_divers', (req, res) => {
    console.log(res);
  });
};