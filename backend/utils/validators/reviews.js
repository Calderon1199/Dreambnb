const { check } = require('express-validator');
const { handleValidationErrors } = require('../validation');

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review is required')
        .custom((value) => {
            if (!value.trim()) {
              throw new Error('Description cannot be empty or contain only spaces.');
            }
            return true;
          }),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

module.exports = validateReview;
