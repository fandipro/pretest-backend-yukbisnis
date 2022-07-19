const express = require('express');

const Router = express.Router();

const upload = require('../middlewares/upload');
const { education } = require('../validations/education.validation');
const validation = require('../middlewares/validation');
const {
  list,
  detail,
  store,
  update,
  destroy,
} = require('../controllers/education.controller');

Router.get('/education', list)
  .get('/education/:id', detail)
  .post('/education', upload, education, validation, store)
  .put('/education/:id', upload, education, validation, update)
  .delete('/education/:id', destroy);

module.exports = Router;
