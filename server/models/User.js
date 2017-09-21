const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  facebookId: String,
  email: String
});

mongoose.model('users', userSchema);