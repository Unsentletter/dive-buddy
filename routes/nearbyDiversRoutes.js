const mongoose = require('mongoose');

const requireLogin = require('../middleware/requireLogin');
const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/current_location', async (req, res) => {
    console.log('req', req.body.location);

    const userLocation = req.body.location;
    console.log('user', userLocation);

    // const user = await req.user.save();
    // console.log('user', user);
    //
    res.send(userLocation);
  });

  app.get('/api/nearby_divers', async (req, res) => {

    const longitude = req.user.longitude;
    const latitude = req.user.latitude;


    try {
      const nearbyDivers = await User.find({
        location: {
          $near: [longitude, latitude],
          $maxDistance: 100000/6371
          }
      });

      console.log('divers', nearbyDivers);
    } catch (err) {
      console.log('err', err)
    }


  });
};