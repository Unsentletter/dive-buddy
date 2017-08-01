require('./config/config');

const express = require ('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { authenticate } = require('./middleware/authenticate');
const routes = require('./routes/userRoutes');

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use('/v1', routes);

app.listen(`${PORT}`, () => {
  console.log(`****Started on port ${PORT}****`)
});

module.exports = { app };
