const express = require('express');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();


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
