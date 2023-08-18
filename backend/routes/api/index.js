const router = require('express').Router();
const loginRouter = require('./login');
const signupRouter = require('./signup');
const currentUserRouter = require('./currentUser');
const spotsRouter = require('./spots');
const reviewsRouter = require('./reviews');
const bookingsRouter = require('./bookings');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use(restoreUser);
router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/current_user', currentUserRouter);

router.use('/users', bookingsRouter);
router.use('/spots', spotsRouter, reviewsRouter);
router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }C
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
