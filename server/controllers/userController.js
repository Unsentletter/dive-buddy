const _ = require('lodash');

const { User } = require('../models/user');
const { authenticate } = require('../middleware/authenticate');

module.exports = {
  postUser: (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    const user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((err) => {
      res.status(400).send(err);
    })
  },
  getUser: (req, res) => {
    res.send(req.user);
  },
};