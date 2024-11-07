// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  firstName: {
    type: String,
    maxlength: 255,
  },
  lastName: {
    type: String,
    maxlength: 255,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
