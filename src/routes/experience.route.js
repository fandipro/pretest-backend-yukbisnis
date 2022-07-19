const express = require('express');

const Router = express.Router();

const upload = require('../middlewares/upload');
const { experience } = require('../validations/experience.validation');
const validation = require('../middlewares/validation');
const {
  list,
  detail,
  store,
  update,
  destroy,
} = require('../controllers/experience.controller');

Router.get('/experience', list)
  .get('/experience/:id', detail)
  .post('/experience', upload, experience, validation, store)
  .put('/experience/:id', upload, experience, validation, update)
  .delete('/experience/:id', destroy);

module.exports = Router;
