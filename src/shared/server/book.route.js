const express = require('express');

const bookRoutes = express.Router();

const Book = require('./book.model');

bookRoutes.route('/add').post(async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

bookRoutes.route('/').get(async (req, res) => {
  try {
    const Books = await Book.find();
    res.status(200).json(Books);
  } catch (err) {
    res.status(404).json(err);
  }
});

bookRoutes.route('/delete/:id').delete(async (req, res) => {
  try {
    const deleteBook = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteBook);
  } catch (err) {
    res.status(404).json(err);
  }
});

bookRoutes.route('/update/:id').post(async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = bookRoutes;
