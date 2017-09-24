const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  facebookId: String,
  email: String,
  firstName: String,
  profilePhoto: String
});

mongoose.model('users', userSchema);