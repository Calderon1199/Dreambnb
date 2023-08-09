// backend/routes/api/login.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateLogin } = require('../../utils/validators/users');

const router = express.Router();

  // Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user

module.exports = router;
