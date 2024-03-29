const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const { APP_NAME, NODE_ENV, PORT } = require('./src/helpers/env');
const { failed } = require('./src/helpers/response');

const app = express();

app.use(express.json());

// morgan
app.use(morgan('dev'));

// enable cors
app.use(cors());
app.options('*', cors());

// set security HTTP headers
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

// sanitize request data
app.use(xss());

// compression
app.use(compression());

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// static files
app.use(express.static('public'));

// Root Route
app.get('/', (req, res) =>
  res.send(`${APP_NAME} API - ${NODE_ENV[0].toUpperCase() + NODE_ENV.slice(1)}`)
);

// Main Route
app.use(require('./src/routes/education.route'));
app.use(require('./src/routes/experience.route'));
app.use(require('./src/routes/user.route'));

// Send back a 404 error for any unknown api request
app.use((req, res) => {
  return failed(res, {
    code: 404,
    message: 'Resource on that url not found',
    error: 'Not Found',
  });
});

app.listen(PORT, () => {
  console.log(
    `Server running running at port ${PORT} with ${NODE_ENV} environment`
  );
});
