const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
  coords: [Number]
});

locationSchema.index({ "location": "2d" });

module.exports = locationSchema;