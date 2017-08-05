const _ = require('lodash');
const { mongoose } = require('../db/mongoose');

const { User } = require('../models/user');

module.exports = {
  postUser: (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    const user = new User(body);
    console.log(body);

    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((err) => {
      res.status(400).send(err);
    })
  },
  getUser: (req, res) => {
    console.log(req);
    res.send(req.user);
  },
  loginUser: (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })
    }).catch((err) => {
      res.status(400).send();
    });
  },
  deleteUser: (req, res) => {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }), () => {
      res.status(400).send();
    }
  },
  updateProfile: (req, res) => {
    console.log(req.user);
    const body = _.pick(req.body, ['username', 'description']);
    const id = {_id: req.user._id};

    User.findOneAndUpdate(
      id,
      body,
      {new: true}
    ).then((data) => {
      console.log(data);
      res.send(data);
    })
  }
};