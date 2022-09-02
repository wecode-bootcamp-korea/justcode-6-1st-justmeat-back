const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const serveStatic = require('serve-static');

const createApp = () => {
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.static('public'));

return app;
}

module.exports = { createApp };