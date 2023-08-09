const express = require('express');
const { User } = require('../../db/models');
const bcrypt = require('bcryptjs');
const { validateSignup } = require('../../utils/validators/users');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();


router.post('/', validateSignup, requireAuth, async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password);

    const user = await User.create({
        firstName,
        lastName,
        email,
        username,
        hashedPassword
    });


    if (user) {
      const safeUser = user.toSafeUser()
      return res.json({
        user: safeUser
      });
    } else {
        return next(err);
    }
  }
);

module.exports = router;
