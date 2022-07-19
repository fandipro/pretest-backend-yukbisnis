const { check } = require('express-validator');

const education = [
  // user id
  check('userId', 'User ID cannot be empty').not().isEmpty(),
  check('userId', 'Please enter User ID correctly').isUUID(),
  // School
  check('school', 'School cannot be empty').not().isEmpty(),
  check('school', 'School minimum 3 characters').isLength({
    min: 3,
  }),
  check('school', 'School only letter and number allowed').isAlphanumeric(
    'en-US',
    {
      ignore: ' ',
    }
  ),
  // major
  check('major', 'Position cannot be empty').not().isEmpty(),
  check('major', 'Position only letter allowed').isAlpha('en-US', {
    ignore: ' ',
  }),
  check('major', 'Position minimum 3 characters').isLength({
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

module.exports = { education };
