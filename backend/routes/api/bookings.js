const { Booking, Spot, SpotImage } = require('../../db/models');
const router = require('express').Router();
const { Op } = require('sequelize');
const validateBooking = require('../../utils/validators/bookings');
const { requireAuth } = require('../../utils/auth');

router.get('/:user_id/bookings', requireAuth, async (req, res, next) => {
    const currentUserId = req.user.id;
    try {
        const bookings = await Booking.findAll({
            where: { userId: currentUserId },
            include: [
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                    include: [
                        {
                            model: SpotImage,
                            attributes: ['url'],
                            where: { preview: true },
                            required: false
                        }
                    ]
                }
            ]
        });

        const formattedBookings = bookings.map(booking => ({
            id: booking.id,
            spotId: booking.spotId,
            Spot: {
                id: booking.Spot.id,
                ownerId: booking.Spot.ownerId,
                address: booking.Spot.address,
                city: booking.Spot.city,
                state: booking.Spot.state,
                country: booking.Spot.country,
                lat: booking.Spot.lat,
                lng: booking.Spot.lng,
                name: booking.Spot.name,
                price: booking.Spot.price,
                previewImage: booking.Spot.SpotImages.length > 0 ? booking.Spot.SpotImages[0].url : null
            },
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }));

        res.status(200).json({ Bookings: formattedBookings });
    } catch (error) {
        next(error);
    }
});


router.put('/:booking_id', requireAuth, validateBooking, async (req, res) => {
    const userId = req.user.id;
    const bookingId = req.params.booking_id;
    const { startDate, endDate } = req.body;

    const booking = await Booking.findByPk(bookingId, {
        exclude: Spot
    });

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
    }

    if (new Date(endDate) <= new Date(startDate)) {
        return res.status(400).json({ message: "Bad Request", errors: { endDate: "endDate cannot come before startDate" } });
    }

    const currentDate = new Date().toISOString();
    const bookingEndDate = new Date(booking.endDate);
    if (bookingEndDate.toISOString() < currentDate) {
        return res.status(403).json({ message: "Past bookings can't be modified" });
    }

    const existingBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId,
            id: { [Op.ne]: bookingId },
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

    await booking.update({
        startDate: startDate,
        endDate: endDate
    });

    res.status(200).json(booking);
});

router.delete('/:booking_id', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const bookingId = req.params.booking_id;

    const booking = await Booking.findByPk(bookingId, {
        include: 'Spot'
    });

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.startDate <= new Date()) {
        return res.status(403).json({ message: "Bookings that have started can't be deleted" });
    }

    if (booking.userId !== userId && booking.Spot.ownerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
    }

    await booking.destroy();

    return res.status(200).json({ message: "Successfully deleted" });
});


module.exports = router;
