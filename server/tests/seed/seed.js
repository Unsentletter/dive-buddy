const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'test@email.com',
  password: '11111111',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, '11111111').toString()
  }]
}, {
  _id: userTwoId,
    email: 'fail@email.com',
    password: 'userTwoPassword'
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = { users, populateUsers};