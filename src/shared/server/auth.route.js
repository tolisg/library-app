const express = require('express');
const jwt = require('jsonwebtoken');

const loginRoutes = express.Router();

const Login = require('./auth.model');

loginRoutes.route('/register').post(async (req, res) => {
  try {
    const loginUser = await Login.findOne({ username: req.body.username });
    if (!loginUser) {
      const registerUser = await Login.create(req.body);
      const token = jwt.sign({ registerUser }, 'the_secret_key');
      res.status(201).json({
        token,
        username: registerUser.username
      });
    } else {
      res.status(401).json({ error: 'Username exists try another one!' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

loginRoutes.route('/login').post(async (req, res) => {
  const userInfo = req.body;
  const loginUser = await Login.findOne({ username: req.body.username });
  if (loginUser && userInfo.password === loginUser.password) {
    const token = jwt.sign({ loginUser }, 'the_secret_key');
    // In a production app, you'll want the secret key to be an environment variable
    res.json({
      token,
      username: loginUser.username
    });
  } else {
    res.status(401).json({ error: 'Invalid login. Please try again.' });
  }
});

module.exports = loginRoutes;
