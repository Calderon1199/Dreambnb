const { Spot, Booking, User, SpotImage } = require('../../db/models');
const { Op } = require('sequelize');
const router = require('express').Router();
const validateBooking = require('../../utils/validators/bookings');

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

router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newPrice = parseInt(price);
    const newLat = parseFloat(lat);
    const newLng = parseFloat(lng);


    try {
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

        return res.status(201).json(spot);
    } catch (e) {
        e.status = 400;
        next(e);
    }
})

router.put('/:spot_id', requireAuth, validateSpot, async (req, res) => {
    const spotId = parseInt(req.params.spot_id);
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

router.get('/:spot_id/bookings', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const spotId = req.params.spot_id;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    };

    const bookings = await Booking.findAll({
        where: {
          spotId: spotId
        },
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          }
        ]
    });


    if (spot.ownerId !== userId) {
        const simplifiedBookings = bookings.map(booking => ({
          spotId: booking.spotId,
          startDate: booking.startDate,
          endDate: booking.endDate
        }));
        return res.status(200).json({ Bookings: simplifiedBookings });
    } else {
        return res.status(200).json({ Bookings: bookings });
    }
});

router.post('/:spot_id/bookings', requireAuth, validateBooking, async (req, res) => {
    const userId = req.user.id;
    const spotId = parseInt(req.params.spot_id);
    const { startDate, endDate } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId === userId) {
        return res.status(403).json({ message: "You cannot book your own spot" });
    }

    if (new Date(endDate) <= new Date(startDate)) {
        return res.status(400).json({ message: "Bad Request", errors: { endDate: "endDate cannot be on or before startDate" } });
    }

    const existingBookings = await Booking.findAll({
        where: {
            spotId: spotId,
            [Op.or]: [
                {
                    startDate: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                {
                    endDate: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                {
                    [Op.and]: [
                        { startDate: { [Op.lte]: startDate } },
                        { endDate: { [Op.gte]: endDate } }
                    ]
                }
            ]
        }
    });

    if (existingBookings.length > 0) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        });
    }

    const booking = await Booking.create({
        spotId: spotId,
        userId: userId,
        startDate: startDate,
        endDate: endDate
    });

    res.status(200).json(booking);
});

router.post('/:spot_id/images', requireAuth, async (req, res, next) => {
    try {
        const currentUserId = req.user.id;
      const spotId = req.params.spot_id;
      const { url, preview } = req.body;

      const spot = await Spot.findOne({
        where: {
          id: spotId,
        }
      });

      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }

      if (spot.ownerId !== currentUserId) return res.status(403).json({ message: "Forbidden"});


      const newSpotImage = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
      });

      newSpotImage.setDataValue('preview', preview);

      const updatedSpotImage = {
        id: newSpotImage.id,
        url: newSpotImage.url,
        preview
    };

      return res.status(200).json(updatedSpotImage);
    } catch (error) {
      next(error);
    }
});

router.delete('/:spot_id/images/:image_id', requireAuth, async (req, res, next) => {
    try {
        const spotId = req.params.spot_id;
        const imageId = req.params.image_id;

        const spot = await Spot.findOne({
            where: {
                id: spotId,
                ownerId: req.user.id
            }
        });

        if (!spot) {
            return res.status(404).json({ message: "Forbidden" });
        }

        const spotImage = await SpotImage.findOne({
            where: {
                id: imageId,
                spotId: spot.id
            }
        });

        if (!spotImage) {
            return res.status(404).json({ message: "Spot Image couldn't be found" });
        }

        await spotImage.destroy();

        return res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        next(error);
    }
});


module.exports = router;


module.exports = router;
