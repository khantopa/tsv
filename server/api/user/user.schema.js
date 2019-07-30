const mongoose = require('mongoose');
const { Schema } = mongoose;
const Promise = require('bluebird');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: { 
    type: String,
    required: true
  },
  fileName: {
    type: String,
  },
});

const model = mongoose.model('user', userSchema, 'user');
Promise.promisifyAll(model);
module.exports = model;
module.exports.collectionName = 'user';
