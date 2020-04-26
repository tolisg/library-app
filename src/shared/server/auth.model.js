const mongoose = require('mongoose');

const { Schema } = mongoose;

const Login = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String }
}, { collection: 'auth' });

module.exports = mongoose.model('Login', Login);
