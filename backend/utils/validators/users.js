const { check } = require('express-validator');
const { handleValidationErrors } = require('../validation');

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.')
      .custom((value) => {
        if (!value.trim()) {
          throw new Error('Email cannot be empty or contain only spaces.');
        }
        return true;
      }),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a first name.')
      .custom((value) => {
        if (!value.trim()) {
          throw new Error('First name cannot be empty or contain only spaces.');
        }
        return true;
      }),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a last name.')
      .custom((value) => {
        if (!value.trim()) {
          throw new Error('Last name cannot be empty or contain only spaces.');
        }
        return true;
      }),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.')
      .custom((value) => {
        if (!value.trim()) {
          throw new Error('Username cannot be empty or contain only spaces.');
        }
        return true;
      }),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.')
      .custom((value) => {
        if (!value.trim()) {
          throw new Error('Password cannot be empty or contain only spaces.');
        }
        return true;
      }),
    handleValidationErrors
  ];

module.exports = {
    validateLogin,
    validateSignup
};
