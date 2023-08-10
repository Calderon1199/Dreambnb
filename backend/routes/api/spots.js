const { Spot, User } = require('../../db/models');
const router = require('express').Router();

const { requireAuth } = require('../../utils/auth');


router.get('/', requireAuth, async (req, res) => {
    const spots = await Spot.findAll();
    res.json({
        Spots: spots
    });
})

router.get('/users', requireAuth, async (req, res) => {
    const currentUser = req.user;
    console.log(currentUser.id, '-------------')

    // Retrieve all spots owned by the current user
    const ownedSpots = await Spot.findAll({
      where: {
        ownerId: currentUser.id
      }
    });

    res.status(200).json({
      Spots: ownedSpots
    });

})




module.exports = router;
