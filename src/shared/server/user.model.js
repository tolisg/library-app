const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  name: { type: String },
  lastname: { type: String },
  address: { type: String },
  email: { type: String },
  onloan: { type: String },
  loan_history: { type: Array },
}, { collection: 'users' });

module.exports = mongoose.model('User', User);
