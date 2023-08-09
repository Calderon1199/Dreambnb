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
router.get('/', (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = user.toSafeUser()
    return res.json({
      user: safeUser
    });
  } else {
    return res.json({ user: null });
  }
}
);

module.exports = router;
