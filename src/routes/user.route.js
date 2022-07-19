const express = require('express');

const Router = express.Router();

const upload = require('../middlewares/upload');
const { user } = require('../validations/user.validation');
const validation = require('../middlewares/validation');
const {
  list,
  detail,
  listEducation,
  listExperience,
  store,
  update,
  destroy,
} = require('../controllers/user.controller');

Router.get('/user', list)
  .get('/user/:id', detail)
  .get('/user/education/:id', listEducation)
  .get('/user/experience/:id', listExperience)
  .post('/user', upload, user, validation, store)
  .put('/user/:id', upload, user, validation, update)
  .delete('/user/:id', destroy);

module.exports = Router;
