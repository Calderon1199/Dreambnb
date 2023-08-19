const { Spot, Booking, User, Review, SpotImage, sequelize } = require('../../db/models');
const { Op } = require('sequelize');
const router = require('express').Router();
const validateBooking = require('../../utils/validators/bookings');

const { requireAuth } = require('../../utils/auth');
const validateSpot = require('../../utils/validators/spots');



router.get('/', async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

if (!page) page = 1;
if (!size) size = 20;
if (page > 10) size = 1;
if (size > 20) size = 20;
page = parseInt(page);
size = parseInt(size);

let pag = {};

if (page !== 0 && size !==0) {
    pag.limit = size;
    pag.offset = size * (page - 1);
}

const where = {};

if (minPrice) where.price = {[Op.gte]: maxPrice};
if (maxPrice) where.price = {...where.price, [Op.lte]: maxPrice};
if (minLat) where.lat = {[Op.gte]: minLat};
if (maxLat) where.lat = {...where.lat, [Op.lte]: maxLat};
if (minLng) where.lng = {[Op.gte]: minLng};
if (maxLng) where.lng = {...where.lng, [Op.lte]: maxLng};

try {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: []
            }
        ],
        where,
        ...pag,
    });

    for (let spot of spots) {
        const previewImage = await SpotImage.findOne({
            attributes: ["url"],
            where: {spotId: spot.id, preview: true}
        });

        if (previewImage) spot.dataValues.previewImage = previewImage.dataValues.url;

        const spotRating = await Spot.findByPk(spot.id, {
            include: [
                {
                    model: Review,
                    attributes: [],
                }
            ],
            attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "description", "price", "createdAt", "updatedAt",
                        [sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("stars")), 1), "avgRating"] ],
            group: ["Spot.id"]
        });

        const avgRating = spotRating.dataValues.avgRating;

        if (spotRating) spot.dataValues.avgRating = avgRating;
    }

    return res.status(200).json({
        Spots: spots,
        page: page,
        size: size
    });
    } catch (error) {
        next(error)
    }

});


router.get('/user', requireAuth, async (req, res) => {
    try {
        const userId = req.user.id;

        const spots = await Spot.findAll({
          where: { ownerId: userId },
          include: [
            {
              model: SpotImage,
              attributes: ['url', 'preview']
            },
            {
              model: Review,
              attributes: [[sequelize.fn('avg', sequelize.col('stars')), 'avgRating']],
              required: false
            }
          ],
          group: ['Spot.id'],
          raw: true
        });

        const responseSpots = spots.map(spot => {
          const responseSpot = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: parseInt(spot.price),
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: spot['Reviews.avgRating'] || null
          };

          const isPreview = spot['SpotImages.preview'] === 1;

          if (isPreview) {
            responseSpot.previewImage = spot['SpotImages.url'];
          } else {
            responseSpot.previewImage = null;
          }

          return responseSpot;
        });

        return res.status(200).json({ Spots: responseSpots });
      } catch (error) {
        next(error);
      }
});

router.get('/:spot_id', async (req, res, next) => {
    try {
        const spotId = req.params.spot_id;

        const spot = await Spot.findByPk(spotId);

        if (!spot) {
          return res.status(404).json({ message: "Spot couldn't be found" });
        }

        const spotImages = await spot.getSpotImages({
          attributes: ['id', 'url', 'preview']
        });

        const reviews = await spot.getReviews({
          attributes: [
            [sequelize.fn('avg', sequelize.col('stars')), 'avgStarRating'],
            [sequelize.fn('count', sequelize.col('id')), 'numReviews']
          ],
          raw: true,
          required: false
        });

        const owner = await spot.getOwner({
          attributes: ['id', 'firstName', 'lastName']
        });

        const responseSpot = {
          id: spot.id,
          ownerId: spot.ownerId,
          address: spot.address,
          city: spot.city,
          state: spot.state,
          country: spot.country,
          lat: spot.lat,
          lng: spot.lng,
          name: spot.name,
          description: spot.description,
          price: parseInt(spot.price),
          createdAt: spot.createdAt,
          updatedAt: spot.updatedAt,
          numReviews: reviews.length > 0 ? reviews[0].numReviews : 0,
          avgStarRating: reviews.length > 0 ? reviews[0].avgStarRating : null,
          SpotImages: spotImages.map(image => ({
            id: image.id,
            url: image.url,
            preview: image.preview === 1
          })),
          Owner: {
            id: owner.id,
            firstName: owner.firstName,
            lastName: owner.lastName
          }
        };

        return res.status(200).json(responseSpot);
      } catch (error) {
        next(error);
      }
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
