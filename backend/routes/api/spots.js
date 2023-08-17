const { Spot } = require('../../db/models');
const router = require('express').Router();

const { requireAuth } = require('../../utils/auth');
const validateSpot = require('../../utils/validators/spots');



router.get('/', requireAuth, async (req, res) => {
    const spots = await Spot.findAll();
    res.json({
        Spots: spots
    });
})

router.get('/user', requireAuth, async (req, res) => {
    const currentUser = req.user;

    // Retrieve all spots owned by the current user
    const ownedSpots = await Spot.findAll({
      where: {
        ownerId: currentUser.id
      }
    });

    res.status(200).json({
      Spots: ownedSpots
    });
});

router.get('/:spot_id', async (req, res) => {
    const spotId = req.params.spot_id;

    const spot = await Spot.findOne({
        where: {
            id: spotId
        }
    });

    if (!spot) {
        return res.status(404).json({ "message": "Spot couldn't be found" });
    } else {
        res.json(spot);
    };
});

router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newPrice = parseInt(price);
    const newLat = parseFloat(lat);
    const newLng = parseFloat(lng);


        const spot = await Spot.create({
          ownerId: req.user.id,
          address,
          city,
          state,
          country,
          lat: newLat,
          lng: newLng,
          name,
          description,
          price: newPrice
        });

        res.status(201).json(spot);
})

router.put('/:spot_id', requireAuth, validateSpot, async (req, res) => {
    const spotId = req.params.spot_id;
    const userId = req.user.id;
    const newData = req.body;

    const spot = await Spot.findByPk(spotId);

    if (!spot) return res.status(404).json({ message: "Spot not found" });

    if (spot.ownerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
    };

    const newSpot = {
        id: spotId,
        ownerId: userId,
        ...newData,
        createdAt: spot.createdAt,
        updatedAt: new Date().toISOString(),
    }

    res.json(newSpot);
});

router.delete('/:spot_id', requireAuth, validateSpot, async (req, res) => {
    const spotId = req.params.spot_id;
    const userId = req.user.id;


    const spot = await Spot.findByPk(spotId);

    if (!spot) return res.status(404).json({ message: "Spot not found" });

    if (spot.ownerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
    };

    await spot.destroy();
    res.json({message: "Successfully deleted"});
})




module.exports = router;
