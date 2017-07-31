require('./config/config');

const express = require ('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');
const routes = require('./routes/index');

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use('/v1', routes);


// app.post('/users', );

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })
  }).catch((err) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }), () => {
    res.status(400).send();
  }
});

app.post('/users/profile', authenticate, (req, res) => {
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
});

app.listen(`${PORT}`, () => {
  console.log(`****Started on port ${PORT}****`)
});

module.exports = { app };
