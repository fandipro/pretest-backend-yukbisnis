const { check } = require('express-validator');

const experience = [
  // user id
  check('userId', 'User ID cannot be empty').not().isEmpty(),
  check('userId', 'Please enter User ID correctly').isUUID(),
  // company
  check('company', 'Position cannot be empty').not().isEmpty(),
  check('company', 'Position minimum 3 characters').isLength({
    min: 3,
  }),
  // position
  check('position', 'Position cannot be empty').not().isEmpty(),
  check('position', 'Position only letter allowed').isAlpha('en-US', {
    ignore: ' ',
  }),
  check('position', 'Position minimum 3 characters').isLength({
    min: 3,
  }),
  // start date
  check('startDate', 'Start Date cannot be empty').not().isEmpty(),
  check('startDate', 'Please enter Start Date correctly').isDate(),
  // end date
  check('endDate', 'End Date cannot be empty').not().isEmpty(),
  check('endDate', 'Please enter End Date correctly').isDate(),
  // type
  check('type', 'Job Type cannot be empty').not().isEmpty(),
  check('type', 'Job Type minimum 3 characters').isLength({
    min: 3,
  }),
];

module.exports = { experience };
