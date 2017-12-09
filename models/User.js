const mongoose = require('mongoose');
const { Schema } = mongoose;
const LocationSchema = require('./Location');

const userSchema = new Schema({
  facebookId: String,
  email: String,
  firstName: String,
  profilePhoto: String,
  dateJoined: Date,
  location: [LocationSchema]
});

mongoose.model('users', userSchema);