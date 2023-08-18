const { check } = require('express-validator');
const { handleValidationErrors } = require('../validation');

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('startDate is required')
        .custom((value) => {
            if (!value.trim()) {
              throw new Error('Start date cannot be empty or contain only spaces.');
            }
            return true;
          }),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage("End date is required")
        .custom((value) => {
            if (!value.trim()) {
              throw new Error('End date cannot be empty or contain only spaces.');
            }
            return true;
          }),
    handleValidationErrors
];

module.exports = validateBooking;
