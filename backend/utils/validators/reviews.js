const { check } = require('express-validator');
const { handleValidationErrors } = require('../validation');

const validateReview = [
  check('review')
  .trim() 
  .notEmpty()
  .withMessage('Review text is required')
  .isAlpha()
  .withMessage('Review should contain only letters'),
check('stars')
  .exists({ checkFalsy: true })
  .withMessage("Stars must be an integer from 1 to 5")
  .isInt({ min: 1, max: 5 })
  .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

module.exports = validateReview;
