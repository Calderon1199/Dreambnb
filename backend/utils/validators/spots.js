const { check } = require('express-validator');
const { handleValidationErrors } = require('../validation');

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required')
        .custom((value) => {
            if (!value.trim()) {
              throw new Error('Address cannot be empty or contain only spaces.');
            }
            return true;
          }),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required')
        .custom((value) => {
            if (!value.trim()) {
              throw new Error('City cannot be empty or contain only spaces.');
            }
            return true;
          }),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required')
        .custom((value) => {
            if (!value.trim()) {
              throw new Error('State cannot be empty or contain only spaces.');
            }
            return true;
          }),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required')
        .custom((value) => {
            if (!value.trim()) {
              throw new Error('Country cannot be empty or contain only spaces.');
            }
            return true;
          }),
    check('lat')
        .exists({ checkFalsy: true })
        .isDecimal()
        .isNumeric()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal()
        .isNumeric()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name is required')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters')
        .custom((value) => {
            if (!value.trim()) {
              throw new Error('Name cannot be empty or contain only spaces.');
            }
            return true;
          }),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required')
        .custom((value) => {
            if (!value.trim()) {
              throw new Error('Description cannot be empty or contain only spaces.');
            }
            return true;
          }),
    check('price')
        .exists({ checkFalsy: true }).
        withMessage('Price per day is required')
        .isInt({ gt: 0 })
        .withMessage('Price must be larger than zero'),
    handleValidationErrors
]

module.exports = validateSpot;
