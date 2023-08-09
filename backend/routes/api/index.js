const router = require('express').Router();
const usersRouter = require('./users');
const loginRouter = require('./login');
const signupRouter = require('./signup');
const currentUserRouter = require('./currentUser');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use(restoreUser);
router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/current_user', currentUserRouter);

// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });


// Add a XSRF-TOKEN cookies
router.get("/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });


module.exports = router;
