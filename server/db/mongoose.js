const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/DiveBuddy');

mongoose.connect('mongodb://localhost:27017/DiveBuddy');

module.exports = { mongoose };
