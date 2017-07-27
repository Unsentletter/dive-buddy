const express = require ('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({
    name: 'trit',
    sex: 'yes please'
  });
});

app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  let user = new User(body);

  user.save().then((user) => {
    res.send(user);
  }).catch((err) => {
    res.status(400).send(err);
  })
});

app.listen(`${PORT}`, () => {
  console.log(`****Started on port ${PORT}****`)
});
