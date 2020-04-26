const mongoose = require('mongoose');

const { Schema } = mongoose;

const Book = new Schema({
  title: { type: String },
  ISBN: { type: String },
  copies: { type: String },
  copies_available: { type: String },
  loan_history: { type: Array },
  loan_to: { type: String },
  summary: { type: String },
}, { collection: 'books' });

module.exports = mongoose.model('Book', Book);
