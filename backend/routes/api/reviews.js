const { Spot, User, Review, ReviewImage } = require('../../db/models');
const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const validateReview = require('../../utils/validators/reviews');

router.get('/users', requireAuth, async (req, res) => {
    const currentUserId = req.user.id;
    const reviews = await Review.findAll({
        where: {
            userId: currentUserId
        },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Spot, attributes: { exclude: ['createdAt', 'updatedAt'] }, }
        ]
    });

    res.json({ Reviews: reviews });
});

router.get('/:spot_id/reviews', async (req, res) => {
    const spotId = req.params.spot_id;
    const allReviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] }
        ]
    });

    if (!allReviews.length) return res.status(404).json({ "message": "Spot could not be found"});

    res.json({ Reviews: allReviews });
});

router.post('/:spot_id/reviews', requireAuth, validateReview, async (req, res) => {
    const spotId = parseInt(req.params.spot_id);
    const spot = await Spot.findByPk(spotId);
    const userId = req.user.id;
    const { review, stars } = req.body;
    const existingReview = await Review.findOne({
        where: { userId, spotId }
    });

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    };

    if (existingReview) {
        return res.status(500).json({ message: "User already has a review for this spot" });
    };

    const newReview = await Review.create({
        userId,
        spotId,
        review,
        stars
    });

    res.status(201).json(newReview);
});

router.put('/:review_id', requireAuth, validateReview, async (req, res) => {
    const currentUserId = req.user.id;
    const reviewId = req.params.review_id;
    const userReview = await Review.findByPk(reviewId);
    const { review, stars } = req.body;

    if (!review) return res.status(400).json()

    if (!userReview) return res.status(404).json({ message: "Review couldn't be found." });

    if (userReview.userId !== currentUserId) {
        return res.status(403).json({ message: "Forbidden" });
    };

    userReview.review = review;
    userReview.stars = stars;
    await userReview.save();

    res.status(200).json(userReview);
});

router.delete('/:review_id', requireAuth, async (req, res) => {
    const reviewId = req.params.review_id;
    const currentUserId = req.user.id;
    const review = await Review.findByPk(reviewId);

    if (!review) return res.status(404).json({ message: "Review could not be found. "})

    if (review.userId !== currentUserId) return res.status(403).json({ message: "Forbidden"});

    await review.destroy();

    res.json({ message: "Successfully deleted"});
});

router.post('/:review_id/images', requireAuth, async (req, res, next) => {
    try {
    const currentUserId = req.user.id;
      const reviewId = req.params.review_id;
      const { url } = req.body;

      const review = await Review.findOne({
        where: {
          id: reviewId,
        }
      });

    if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== currentUserId) return res.status(403).json({ message: "Forbidden"});


      const imageCount = await ReviewImage.count({
        where: {
          reviewId: review.id
        }
      });

      const maxImages = 10;

      if (imageCount >= maxImages) {
        return res.status(403).json({ message: "Maximum number of images for this resource was reached" });
      }

      const newReviewImage = await ReviewImage.create({
        reviewId: review.id,
        url
      });

      const updatedReviewImage = {
        id: newReviewImage.id,
        url: newReviewImage.url
    };


      return res.status(200).json(updatedReviewImage);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:review_id/images/:image_id', requireAuth, async (req, res, next) => {
    try {
      const currentUserId = req.user.id;
      const reviewId = req.params.review_id;
      const imageId = req.params.image_id;

      const review = await Review.findOne({
        where: {
          id: reviewId,
          userId: req.user.id
        }
      });
      console.log(review);


      if (!review) {
          return res.status(404).json({ message: "Review couldn't be found" });
        }

        if (review.userId !== currentUserId) return res.status(403).json({ message: "Forbidden" });

        const reviewImage = await ReviewImage.findOne({
        where: {
          id: imageId,
          reviewId: review.id
        }
      });

      if (!reviewImage) {
        return res.status(404).json({ message: "Review Image couldn't be found" });
      }

      await reviewImage.destroy();

      return res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;


module.exports = router;
