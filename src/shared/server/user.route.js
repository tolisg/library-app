const express = require('express');

const userRoutes = express.Router();

const User = require('./user.model');

userRoutes.route('/add').post(async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

userRoutes.route('/').get(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json(err);
  }
});

userRoutes.route('/delete/:id').delete(async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(404).json(err);
  }
});

userRoutes.route('/update/:id').post(async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = userRoutes;
