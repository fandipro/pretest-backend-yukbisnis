const { check } = require('express-validator');

const user = [
  // name
  check('name', 'Name cannot be empty').not().isEmpty(),
  check('name', 'Name only can contains alphabet').isAlpha('en-US', {
    ignore: ' ',
  }),
  check('name', 'Name maximum length is 50 characters').isLength({ max: 50 }),
  // phone number
  check('phoneNumber', 'Phone Number cannot be empty').not().isEmpty(),
  check('phoneNumber', 'Phone Number only number allowed').isNumeric(),
  check(
    'phoneNumber',
    'Phone Number must be between 11 and 20 characters'
  ).isLength({
    min: 11,
    max: 20,
  }),
  // address
  check('address', 'Address cannot be empty').not().isEmpty(),
  check('address', 'Address minimum length is 3 characters').isLength({
    min: 3,
  }),
  // email
  check('email', 'Email cannot be empty').not().isEmpty(),
  check('email', 'Please enter email correctly').isEmail(),
  check('email', 'Email maximum length is 50 characters').isLength({ max: 50 }),
];

module.exports = { user };
