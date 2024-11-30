const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /users
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      res.status(400).json({ error: err.errors.map(e => e.message) });
    } else {
      console.error(err);
      res.status(500).send('Ошибка сервера');
    }
  }
});

// GET /users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;
