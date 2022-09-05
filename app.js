const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('serve-static');
const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(routes);
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true }));
  return app;
}
module.exports = { createApp };